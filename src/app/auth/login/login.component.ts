import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isLoadingSubscription: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.isLoadingSubscription = this.authService.getAuthProcessStatus()
      .subscribe((load) => {
        this.isLoading = load;
      })
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }

  onLogin(loginForm: NgForm) {
    if(loginForm.invalid) return;
    this.isLoading = true;
    this.authService.loginUser(loginForm.value.username, loginForm.value.password);
  }
}
