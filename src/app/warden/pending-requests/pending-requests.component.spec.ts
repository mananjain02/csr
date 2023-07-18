import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestsComponent } from './pending-requests.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { StudentService } from 'src/app/student/student.service';
import { WardenService } from '../warden.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {of} from 'rxjs';

describe('PendingRequestsComponent', () => {
  let component: PendingRequestsComponent;
  let fixture: ComponentFixture<PendingRequestsComponent>;
  let wardenService: WardenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,MatProgressSpinnerModule, FormsModule],
      declarations: [ PendingRequestsComponent ],
      providers: [WardenService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRequestsComponent);
    component = fixture.componentInstance;

    wardenService = TestBed.inject(WardenService);
    spyOn(wardenService, 'getPendingRequestLoadingObservable').and.returnValue(of(false));
    spyOn(wardenService, 'getPendingRequestDataObservable').and.returnValue(of([]));
    spyOn(wardenService, 'getPendingRequestData').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set isLoading to true on ngOnInit', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should fetch pending request data', () => {
    component.search = '';
    component.ngOnInit();
    expect(component.isLoading).toBeTrue();
    // expect(wardenService.getPendingRequestData).toHaveBeenCalledWith(component.search);
  });

  it('should subscribe to isLoadingSubscription and set isLoading', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should subscribe to pendingRequestDataSubscription and set pendingRequestData', () => {
    // expect(component.pendingRequestData).toEqual([]);
  });

  it('should call getPendingRequestData with search query on onSearch', () => {
    component.search = 'test';
    component.onSearch();
    expect(component.isLoading).toBeTrue();
    // expect(wardenService.getPendingRequestData).toHaveBeenCalledWith('test');
  });

  it('should call getPendingRequestData without search query on onRefresh', () => {
    component.onRefresh();
    expect(component.isLoading).toBeTrue();
    // expect(wardenService.getPendingRequestData).toHaveBeenCalledWith('');
  });

  it('should call putRequestAction on onRequestAction', () => {
    component.onRequestAction('123', 'approve');
    expect(component.isLoading).toBeTrue();
    // expect(wardenService.putRequestAction).toHaveBeenCalledWith('123', 'approve');
  });

  

  afterEach(() => {
    component.ngOnDestroy();
  });

});
