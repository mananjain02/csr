import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WardenService } from '../warden.service';
import { PendingRequest } from '../models/pending-request.model';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css'],
  providers: [WardenService]
})
export class PendingRequestsComponent implements OnInit, OnDestroy {
  search: String = '';
  isLoading: Boolean = false;
  isLoadingSubscription: Subscription;
  pendingRequestData: PendingRequest[];
  pendingRequestDataSubscription: Subscription;
  tableColumns = ['id', 'studentId', 'startDate', 'endDate', 'reason', 'action'];
  constructor(private wardenService: WardenService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.isLoadingSubscription = this.wardenService.getPendingRequestLoadingObservable()
      .subscribe((loading) => {
        this.isLoading = loading;
      })
    this.pendingRequestDataSubscription = this.wardenService.getPendingRequestDataObservable()
      .subscribe((data) => {
        this.pendingRequestData = data;
        this.pendingRequestData.reverse();
      })
    this.wardenService.getPendingRequestData(this.search);
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
    this.pendingRequestDataSubscription.unsubscribe();
  }

  onSearch() {
    this.isLoading = true;
    this.wardenService.getPendingRequestData(this.search);
  }

  onRefresh() {
    this.isLoading = true;
    this.search = '';
    this.wardenService.getPendingRequestData(this.search);
  }

  onRequestAction(id: String, action: String) {
    this.isLoading = true;
    console.log(id, action);
    this.wardenService.putRequestAction(id, action);
  }
}
