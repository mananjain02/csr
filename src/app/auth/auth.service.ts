import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuthenticated: boolean = false;
  private tokenTimer: NodeJS.Timer;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private authProcessCompleteListener = new Subject<boolean>();

  constructor(private httpClient: HttpClient,
    private router: Router) {}

  getAuthProcessStatus() {
    return this.authProcessCompleteListener.asObservable();
  }

  getAuthenticatedStatus() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusObservable() {
    return this.authStatusListener.asObservable();
  }

  loginUser(username: string, password: string) {
    const authData = {
      username: username,
      password: password
    };
    this.httpClient.post<{token: string, userId: string}>(environment.backendUrl +"/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          // giving token for one hour
          const expiresIn = 3600;

          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(token, expirationDate, response.userId);
          this.router.navigate(["/"]);
        }
      });
    this.authProcessCompleteListener.next(false);
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = "";
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation?.expirationDate.getTime()! - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
      this.userId = authInformation.userId!;
    }
  }

  private saveAuthData(token: string, expirationDate: Date,  userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate) {
      return {};
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }
}
