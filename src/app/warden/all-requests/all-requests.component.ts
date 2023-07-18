import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompletedRequest } from '../models/completed-request.model';
import { WardenService } from '../warden.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.css'],
  providers: [WardenService]
})
export class AllRequestsComponent implements OnInit, OnDestroy {
  search: String = "";
  isLoading: Boolean = false;
  isLoadingSubscription: Subscription;
  allRequestData: CompletedRequest[];
  allRequestDataSubscription: Subscription;
  tableColumns = ['id', 'studentId', 'startDate', 'endDate', 'reason', 'status'];
  constructor(private wardenService: WardenService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isLoadingSubscription = this.wardenService.getAllRequestLoadingObservable()
      .subscribe((load) => {
        this.isLoading = load;
      })
    this.allRequestDataSubscription = this.wardenService.getAllRequestObservable()
      .subscribe((data) => {
        this.allRequestData = data;
        this.allRequestData.reverse();
      })
    this.wardenService.getAllRequestData(this.search);
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
    this.allRequestDataSubscription.unsubscribe();
  }

  onSearch() {
    this.isLoading = true;
    this.wardenService.getAllRequestData(this.search);
  }

  onRefresh() {
    this.isLoading = true;
    this.search = '';
    this.wardenService.getAllRequestData(this.search);
  }
}
