import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  role: String;
  // remove initialization once auth is ready
  authenticated: Boolean = true;
  authenticateSubscription: Subscription;
  roleSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authenticateSubscription = this.authService.getAuthStatusObservable()
      .subscribe((authStatus) => {
        this.authenticated = authStatus;
      })
    this.roleSubscription = this.authService.getRoleObservable()
      .subscribe((role) => {
        this.role = role;
      })
    console.log("header role", this.role);
  }

  ngOnDestroy(): void {
    this.authenticateSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout()
  }
}
