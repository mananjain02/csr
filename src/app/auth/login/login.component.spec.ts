import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import {of} from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,MatDialogModule,FormsModule,MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to true when authService emits true', () => {
    spyOn(authService, 'getAuthProcessStatus').and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isLoading).toBeTrue();
  });

  it('should call authService.loginUser when login form is valid', () => {
    const validForm = {
      invalid: false,
      value: {
        username: 'testuser',
        password: 'testpassword',
      },
    };
    spyOn(component.authService, 'loginUser');

    component.onLogin(validForm as NgForm);

    expect(component.isLoading).toBeTrue();
    expect(component.authService.loginUser).toHaveBeenCalledWith(
      'testuser',
      'testpassword'
    );
  });

  it('should not call authService.loginUser when login form is invalid', () => {
    const invalidForm = {
      invalid: true,
      value: {
        username: '',
        password: '',
      },
    };
    spyOn(component.authService, 'loginUser');

    component.onLogin(invalidForm as NgForm);

    expect(component.isLoading).toBeFalse();
    expect(component.authService.loginUser).not.toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on component destruction', () => {
    spyOn(component.isLoadingSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.isLoadingSubscription.unsubscribe).toHaveBeenCalled();
  });
});