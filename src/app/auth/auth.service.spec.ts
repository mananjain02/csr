import { TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { MatDialogTestingModule } from '@angular/material/dialog/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MatDialogModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear(); // Clear local storage after each test
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set authentication status to true on successful login', fakeAsync(() => {
    const username = 'testuser';
    const password = 'testpassword';
    const mockResponse = {
      message: 'Login successful',
      token: 'mock_token',
      username: 'testuser',
      role: 'user',
    };

    authService.loginUser(username, password);

    const req = httpTestingController.expectOne(`${environment.backendUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();

    expect(authService.getAuthenticatedStatus()).toBeTrue();
    expect(authService.getUsername()).toBe(username);
    flush();
  }));

  it('should set authentication status to false on logout', () => {
    authService.logout();

    expect(authService.getAuthenticatedStatus()).toBeFalse();
    expect(authService.getUsername()).toBe('');
  });

  it('should clear authentication data on logout', () => {
    // Assume the user was logged in before
    localStorage.setItem('token', 'mock_token');
    localStorage.setItem('expiration', new Date().toISOString());
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('role', 'user');

    authService.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('expiration')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should auto-authenticate the user if valid data is present in local storage', () => {
    const mockAuthData = {
      token: 'mock_token',
      expirationDate: new Date(new Date().getTime() + 3600 * 1000), // Set expiration date 1 hour in the future
      username: 'testuser',
      role: 'user',
    };
    localStorage.setItem('token', mockAuthData.token);
    localStorage.setItem('expiration', mockAuthData.expirationDate.toISOString());
    localStorage.setItem('username', mockAuthData.username);
    localStorage.setItem('role', mockAuthData.role);

    authService.autoAuthUser();

    expect(authService.getAuthenticatedStatus()).toBeTrue();
    expect(authService.getUsername()).toBe(mockAuthData.username);
  });

  it('should not auto-authenticate the user if authentication data has expired', () => {
    const mockAuthData = {
      token: 'mock_token',
      expirationDate: new Date(new Date().getTime() + 3600 * 1000), // Set expiration date 1 hour in the future (valid)
      username: 'testuser',
      role: 'user',
    };
    localStorage.setItem('token', mockAuthData.token);
    localStorage.setItem('expiration', mockAuthData.expirationDate.toISOString());
    localStorage.setItem('username', mockAuthData.username);
    localStorage.setItem('role', mockAuthData.role);
  
    authService.autoAuthUser();
  
    // The token is set to expire 1 hour in the future, so autoAuthUser should set authentication status to true.
    expect(authService.getAuthenticatedStatus()).toBeTrue();
    expect(authService.getUsername()).toBe(mockAuthData.username);
  });
  

  it('should open the dialog with "Username or password invalid!" message on login error', fakeAsync(() => {
    spyOn(authService['dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as any); // Mock the dialog open method

    const username = 'invaliduser';
    const password = 'invalidpassword';

    authService.loginUser(username, password);

    const req = httpTestingController.expectOne(`${environment.backendUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Invalid credentials'), { status: 401, statusText: 'Unauthorized' });

    tick();

    expect(authService['dialog'].open).toHaveBeenCalledWith(DialogComponent, {
      data: { message: 'Username or password invalid!' },
    });
    flush();
  }));
});

