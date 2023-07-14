import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isLoadingSubscription: Subscription;
  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoadingSubscription = this.authService.getAuthProcessStatus()
      .subscribe((response) => {
        this.isLoading = response;
      })
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }

  onLogin(loginForm: NgForm) {
    if(loginForm.invalid) return;
    this.router.navigate(['/']);
    this.isLoading = true;
    this.authService.loginUser(loginForm.value.username, loginForm.value.password);
  }
}
