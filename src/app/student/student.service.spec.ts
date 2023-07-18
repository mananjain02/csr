// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { MatDialog } from '@angular/material/dialog';
// import { BehaviorSubject } from 'rxjs';

// import { StudentService } from './student.service';
// import { DialogComponent } from '../dialog/dialog.component';
// import { StudentRequest } from './models/student-request.model';
// import { StudentProfile } from './models/student-profile.model';
// import { environment } from 'src/environments/environment';

// describe('StudentService', () => {
//   let service: StudentService;
//   let httpMock: HttpTestingController;
//   let dialogMock: MatDialog;

//   beforeEach(() => {
//     dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         { provide: MatDialog, useValue: dialogMock },
//       ]
//     });

//     service = TestBed.inject(StudentService);
//     httpMock = TestBed.inject(HttpTestingController);
//     dialogMock = TestBed.inject(MatDialog);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should send a leave request', () => {
//     const startDate = new Date();
//     const endDate = new Date();
//     const reason = 'Vacation';

//     const mockResponse = { message: 'Submitted successfully!' };

//     service.sendLeaveRequest(startDate, endDate, reason);

//     const req = httpMock.expectOne(`${environment.backendUrl}/student`);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual({
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//       reason: reason
//     });

//     req.flush(mockResponse);

//     service.leaveFormLoading.subscribe(loading => {
//       expect(loading).toBeFalsy();
//     });

//     // expect(dialogMock.open).toHaveBeenCalledWith(DialogComponent, {
//     //   data: { message: 'Submitted successfully!' }
//     // });
//   });

//   it('should handle error when sending a leave request', () => {
//     const startDate = new Date();
//     const endDate = new Date();
//     const reason = 'Vacation';

//     service.sendLeaveRequest(startDate, endDate, reason);

//     const req = httpMock.expectOne(`${environment.backendUrl}/student`);
//     req.error(new ErrorEvent('Invalid start date!'));

//     service.leaveFormLoading.subscribe(loading => {
//       expect(loading).toBeFalsy();
//     });

//     expect(dialogMock.open).toHaveBeenCalledWith(DialogComponent, {
//       data: { message: 'Invalid start date!' }
//     });
//   });

//   it('should get student profile data', () => {
//     const mockResponse: StudentProfile = {
//       name: 'John Doe',
//       phoneNumber: '1234567890',
//       address: '123 Main St'
//     };

//     service.getStudentProfileData();

//     const req = httpMock.expectOne(`${environment.backendUrl}/student-detail`);
//     expect(req.request.method).toBe('GET');

//     req.flush({ message: 'Success', data: mockResponse });

//     service.studentProfileLoading.subscribe(loading => {
//       expect(loading).toBeFalsy();
//     });

//     service.studentProfileDataSubject.subscribe(data => {
//       expect(data).toEqual(mockResponse);
//     });
//   });

//   it('should update student profile data', () => {
//     const name = 'John Doe';
//     const phoneNumber = '1234567890';
//     const address = '123 Main St';

//     const mockResponse = { message: 'Updated successfully!' };

//     service.putStudentProfileData(name, phoneNumber, address);

//     const req = httpMock.expectOne(`${environment.backendUrl}/student-detail`);
//     expect(req.request.method).toBe('PUT');
//     expect(req.request.body).toEqual({
//       name: name,
//       phoneNumber: phoneNumber,
//       address: address
//     });

//     req.flush(mockResponse);

//     service.studentProfileLoading.subscribe(loading => {
//       expect(loading).toBeFalsy();
//     });

//     service.studentProfileDataSubject.subscribe(data => {
//       expect(data).toEqual({
//         name: name,
//         phoneNumber: phoneNumber,
//         address: address
//       });
//     });

//     service.studentProfileEditSubject.subscribe(editing => {
//       expect(editing).toBeFalsy();
//     });
//   });

//   it('should handle error when updating student profile data', () => {
//     const name = 'John Doe';
//     const phoneNumber = '1234567890';
//     const address = '123 Main St';

//     service.putStudentProfileData(name, phoneNumber, address);

//     const req = httpMock.expectOne(`${environment.backendUrl}/student-detail`);
//     req.error(new ErrorEvent('Invalid data!'));

//     service.studentProfileLoading.subscribe(loading => {
//       expect(loading).toBeFalsy();
//     });

//     service.studentProfileDataSubject.subscribe(data => {
//       expect(data).toBeUndefined();
//     });

//     service.studentProfileEditSubject.subscribe(editing => {
//       expect(editing).toBeFalsy();
//     });
//   });

//   // it('should return leave form loading observable', () => {
//   //   expect(service.getLeaveFormLoadingObservable()).toBe(service.leaveFormLoading.asObservable());
//   // });

//   // it('should return student profile loading observable', () => {
//   //   expect(service.getStudentProfileLoadingObservable()).toBe(service.studentProfileLoading.asObservable());
//   // });

//   // it('should return student profile data observable', () => {
//   //   expect(service.getStudentDataObservable()).toBe(service.studentProfileDataSubject.asObservable());
//   // });

//   // it('should return student profile edit observable', () => {
//   //   expect(service.getStudentEditObservable()).toBe(service.studentProfileEditSubject.asObservable());
//   // });
// });

