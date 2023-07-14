import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  role: string;
  // remove initialization once auth is ready
  authenticated: Boolean = true;
  authenticateSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authenticateSubscription = this.authService.getAuthStatusObservable()
      .subscribe((authStatus) => {
        this.authenticated = authStatus;
      })
    this.role = localStorage.getItem("role");
  }

  ngOnDestroy(): void {
    this.authenticateSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout()
  }
}
