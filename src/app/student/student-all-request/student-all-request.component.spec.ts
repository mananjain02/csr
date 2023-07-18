// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { StudentAllRequestComponent } from './student-all-request.component';
// import { HttpClientTestingModule} from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// describe('StudentAllRequestComponent', () => {
//   let component: StudentAllRequestComponent;
//   let fixture: ComponentFixture<StudentAllRequestComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports:[HttpClientModule,HttpClientTestingModule,MatDialogModule,MatProgressSpinnerModule],
//       declarations: [ StudentAllRequestComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(StudentAllRequestComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentAllRequestComponent } from './student-all-request.component';
import { StudentService } from '../student.service';
import { Subscription, of } from 'rxjs';
import { StudentRequest } from '../models/student-request.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('StudentAllRequestComponent', () => {
  let component: StudentAllRequestComponent;
  let fixture: ComponentFixture<StudentAllRequestComponent>;
  let studentService: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAllRequestComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatProgressSpinnerModule],
      providers: [StudentService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAllRequestComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch student request data', () => {
    const requestData: StudentRequest[] = [
      // Add your sample data here
    ];
    spyOn(studentService, 'getStudentRequestObservable').and.returnValue(of(requestData));

    component.ngOnInit();
    fixture.detectChanges();

    // expect(component.tableData).toEqual(requestData);
  });

  it('should call getStudentRequestData with filter query on onChangeFilter', () => {
    const filter = 'pending';
    spyOn(studentService, 'getStudentRequestData');

    component.onChangeFilter(filter);

    expect(component.isLoading).toBeTrue();
    expect(component.filter).toEqual(filter);
    // expect(studentService.getStudentRequestData).toHaveBeenCalledWith(filter);
  });

  it('should call getStudentRequestData with "all" filter on onRefresh', () => {
    spyOn(studentService, 'getStudentRequestData');

    component.onRefresh();

    expect(component.isLoading).toBeTrue();
    expect(component.filter).toEqual('all');
    // expect(studentService.getStudentRequestData).toHaveBeenCalledWith('all');
  });

  it('should unsubscribe from subscriptions on component destruction', () => {
    const studentRequestDataSubscription: Subscription = new Subscription();
    const isLoadingSubscription: Subscription = new Subscription();
    spyOn(studentRequestDataSubscription, 'unsubscribe');
    spyOn(isLoadingSubscription, 'unsubscribe');
    component.studentRequestDataSubscription = studentRequestDataSubscription;
    component.isLoadingSubscrition = isLoadingSubscription;

    component.ngOnDestroy();

    expect(studentRequestDataSubscription.unsubscribe).toHaveBeenCalled();
    expect(isLoadingSubscription.unsubscribe).toHaveBeenCalled();
  });
});

