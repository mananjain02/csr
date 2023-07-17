import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  screenWidth: number;
  @ViewChild('toggleButton', { static: false }) toggleButton: ElementRef;

  // function to get current width of screen
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  role: String;
  // remove initialization once auth is ready
  authenticated: Boolean = true;
  authenticateSubscription: Subscription;
  roleSubscription: Subscription;
  constructor(private authService: AuthService) {
    this.screenWidth = window.innerWidth;
  }

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

  // function to automatically close
  // header on small devices
  autoToggle() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 125);
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);

    if(this.screenWidth > 991) return;
    setTimeout(() => {
      this.toggleButton.nativeElement.click();
    }, 75)
  }

  onLogout() {
    this.role = null;
    this.authService.logout()
    this.autoToggle();
  }
}
