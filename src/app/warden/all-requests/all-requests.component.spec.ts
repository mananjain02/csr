// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AllRequestsComponent } from './all-requests.component';
// import { HttpClientTestingModule} from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';
// import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { FormsModule } from '@angular/forms';

// describe('AllRequestsComponent', () => {
//   let component: AllRequestsComponent;
//   let fixture: ComponentFixture<AllRequestsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports:[HttpClientModule,HttpClientTestingModule,MatDialogModule,MatProgressSpinnerModule, FormsModule],
//       declarations: [ AllRequestsComponent ],
//       providers: [
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//         { provide: MatDialogRef, useValue: {} }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AllRequestsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AllRequestsComponent } from './all-requests.component';
import { WardenService } from '../warden.service';
import { Subscription, of } from 'rxjs';
import { CompletedRequest } from '../models/completed-request.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

describe('AllRequestsComponent', () => {
  let component: AllRequestsComponent;
  let fixture: ComponentFixture<AllRequestsComponent>;
  let wardenService: WardenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRequestsComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule, FormsModule],
      providers: [WardenService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestsComponent);
    component = fixture.componentInstance;
    wardenService = TestBed.inject(WardenService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all request data', () => {
    const requestData: CompletedRequest[] = [
      // Add your sample data here
    ];
    spyOn(wardenService, 'getAllRequestObservable').and.returnValue(of(requestData));

    component.ngOnInit();
    fixture.detectChanges();

    // expect(component.allRequestData).toEqual(requestData);
  });

  it('should call getAllRequestData with search query on onSearch', () => {
    const searchQuery = 'test';
    spyOn(wardenService, 'getAllRequestData');

    component.search = searchQuery;
    component.onSearch();

    expect(component.isLoading).toBeTrue();
    // expect(wardenService.getAllRequestData).toHaveBeenCalledWith(searchQuery);
  });

  it('should call getAllRequestData with empty search query on onRefresh', () => {
    spyOn(wardenService, 'getAllRequestData');

    component.search = 'test';
    component.onRefresh();

    expect(component.isLoading).toBeTrue();
    expect(component.search).toEqual('');
    // expect(wardenService.getAllRequestData).toHaveBeenCalledWith('');
  });

  it('should unsubscribe from subscriptions on component destruction', () => {
    const isLoadingSubscription: Subscription = new Subscription();
    const allRequestDataSubscription: Subscription = new Subscription();
    spyOn(isLoadingSubscription, 'unsubscribe');
    spyOn(allRequestDataSubscription, 'unsubscribe');
    component.isLoadingSubscription = isLoadingSubscription;
    component.allRequestDataSubscription = allRequestDataSubscription;

    component.ngOnDestroy();

    expect(isLoadingSubscription.unsubscribe).toHaveBeenCalled();
    expect(allRequestDataSubscription.unsubscribe).toHaveBeenCalled();
  });
});

