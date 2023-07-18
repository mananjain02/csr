import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { DialogComponent } from "../dialog/dialog.component";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuthenticated: boolean = true;
  private tokenTimer: NodeJS.Timer;
  private username: string;
  private authStatusListener = new Subject<boolean>();
  private authProcessCompleteListener = new Subject<boolean>();
  private roleSubject = new Subject<String>();

  constructor(private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog) {}

  getAuthProcessStatus() {
    return this.authProcessCompleteListener.asObservable();
  }

  getAuthenticatedStatus() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getUsername() {
    return this.username;
  }

  getAuthStatusObservable() {
    return this.authStatusListener.asObservable();
  }

  getRoleObservable() {
    return this.roleSubject.asObservable();
  }

  loginUser(username: string, password: string) {
    console.log("LoginUser function");
    const authData = {
      username: username,
      password: password
    };
    this.httpClient.post<{message:string, token: string, username: string, role: string}>(environment.backendUrl +"/login", authData)
      .subscribe(response => {
        console.log("getting login response");
        const token = response.token;
        this.token = token;
        if(token) {
          // giving token for one hour
          const expiresIn = 3600;

          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.username = response.username;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(token, expirationDate, response.username, response.role);
          console.log("routing to /");
          this.roleSubject.next(response.role);
          this.authProcessCompleteListener.next(false);
          this.router.navigate(["/"]);
        }
      },
      () => {
        this.dialog.open(DialogComponent, {data: {message: "Username or password invalid!"}})
      });
    this.authProcessCompleteListener.next(false);
  }

  logout() {
    console.log("logout");
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.username = "";
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  autoAuthUser() {
    console.log("auto auth user");
    const authInformation = this.getAuthData();
    if(!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation?.expirationDate.getTime()! - now.getTime();
    if(expiresIn > 0) {
      console.log("setting auth properties");
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
      this.username = authInformation.username!;
    }
  }

  private saveAuthData(token: string, expirationDate: Date,  username: string, role: string) {
    console.log("saving auth data on local");
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
  }

  private clearAuthData() {
    console.log("clearing local cache data")
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }

  private getAuthData() {
    console.log("checking local storage");
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if(!token || !expirationDate) {
      return {};
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username,
      role: role
    };
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }
}
