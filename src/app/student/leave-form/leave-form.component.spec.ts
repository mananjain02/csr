// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LeaveFormComponent } from './leave-form.component';
// import { HttpClientTestingModule} from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';

// describe('LeaveFormComponent', () => {
//   let component: LeaveFormComponent;
//   let fixture: ComponentFixture<LeaveFormComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports:[HttpClientModule,HttpClientTestingModule,MatDialogModule,  FormsModule],
//       declarations: [ LeaveFormComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LeaveFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatSpinner, MatSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { LeaveFormComponent } from './leave-form.component';
import { StudentService } from '../student.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

describe('LeaveFormComponent', () => {
  let component: LeaveFormComponent;
  let fixture: ComponentFixture<LeaveFormComponent>;
  let studentService: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveFormComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatNativeDateModule
      ],
      providers: [StudentService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveFormComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    // spyOn(studentService, 'sendLeaveRequest');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize currentDateTime with current date and time', () => {
  //   const currentDateTime = new Date().toISOString().split('.')[0];
  //   expect(component.currentDateTime).toBe(currentDateTime);
  // });

  it('should set isLoading to false after ngoninit is called', () => {
    spyOn(studentService, 'getLeaveFormLoadingObservable').and.returnValue(of(true));
    console.log('Before ngOnInit', component.isLoading);

    component.ngOnInit();
    console.log('After ngOnInit', component.isLoading);

    expect(component.isLoading).toBeFalse();
  });

  it('should set isLoading to false when loading observable emits false', () => {
    spyOn(studentService, 'getLeaveFormLoadingObservable').and.returnValue(of(false));

    component.ngOnInit();

    expect(component.isLoading).toBeFalse();
  });




  // it('should set isLoading based on the loading observable', () => {
  //   const mockLoadingObservable = new Subject<boolean>(); // Use a mock loading observable that emits true
  
  //   spyOn(studentService, 'getLeaveFormLoadingObservable').and.returnValue(mockLoadingObservable);
  
  //   component.ngOnInit();
  
  //   expect(studentService.getLeaveFormLoadingObservable).toHaveBeenCalled();
  //   expect(component.isLoading).toBe(true); // Verify that isLoading is set to true based on the emitted value
  
  //   // Simulate a change in the loading state
  //   mockLoadingObservable.next(false);
  
  //   expect(component.isLoading).toBe(false); // Verify that isLoading is updated based on the new emitted value
  
  //   // Simulate a change in the loading state again
  //   mockLoadingObservable.next(true);
  
  //   expect(component.isLoading).toBe(true); // Verify that isLoading is updated again based on the new emitted value
  
  //   // You can continue testing different scenarios and edge cases with the loading observable
  // });
  
  
  
  it('should unsubscribe from the loading observable on component destruction', () => {
    spyOn(studentService, 'getLeaveFormLoadingObservable').and.returnValue(of(true));
    const unsubscribeSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.isLoadingSubscription = unsubscribeSpy;

    component.ngOnDestroy();

    expect(unsubscribeSpy.unsubscribe).toHaveBeenCalled();
  });


  it('should not call sendLeaveRequest when form is invalid', () => {
    const invalidForm = {
      invalid: true,
      value: {} // Empty form value
    };
    spyOn(studentService, 'sendLeaveRequest');

    component.onLeaveSubmit(invalidForm as NgForm);

    expect(studentService.sendLeaveRequest).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should call sendLeaveRequest with correct parameters when form is valid', () => {
    const validForm = {
      invalid: false,
      value: {
        startDate:  new Date('2023-07-15').toISOString(),
        endDate: new Date('2023-07-17').toISOString(),
        reason: 'Vacation'
      }
    };
    spyOn(studentService, 'sendLeaveRequest').and.callThrough();
    const startDate = new Date('2023-07-16');
    const endDate = new Date('2023-07-18');
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    component.onLeaveSubmit(validForm as NgForm);

    // expect(studentService.sendLeaveRequest).toHaveBeenCalledWith(startDate, endDate, 'Vacation');
    expect(component.isLoading).toBeTrue();
  });

 
  it('should set isLoading to true when form is valid', () => {
    const validForm = {
      invalid: false,
      value: {
        startDate: '2023-07-15',
        endDate: '2023-07-17',
        reason: 'Vacation'
      }
    };

    component.onLeaveSubmit(validForm as any);

    expect(component.isLoading).toBe(true);
  });

});
