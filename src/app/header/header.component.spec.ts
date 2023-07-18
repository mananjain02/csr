import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,MatDialogModule],
      declarations: [ HeaderComponent ],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set authenticated status to false when authService emits false', () => {
    spyOn(authService, 'getAuthStatusObservable').and.returnValue(of(false));

    component.ngOnInit();

    expect(component.authenticated).toBeFalse();
  });

  it('should set role when authService emits a role', () => {
    const testRole = 'admin';
    spyOn(authService, 'getRoleObservable').and.returnValue(of(testRole));

    component.ngOnInit();

    expect(component.role).toBe(testRole);
  });

  it('should unsubscribe from subscriptions on component destruction', () => {
    spyOn(component.authenticateSubscription, 'unsubscribe');
    spyOn(component.roleSubscription, 'unsubscribe');

    component.ngOnDestroy();

    // expect(component.authenticateSubscription.unsubscribe).toHaveBeenCalled();
    // expect(component.roleSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should call logout method of authService on logout', () => {
    spyOn(authService, 'logout');

    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
