import { Injectable } from "@angular/core";
import { Subject, endWith } from "rxjs";
import { PendingRequest } from "./models/pending-request.model";
import { CompletedRequest } from "./models/completed-request.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class WardenService {
  pendingRequestLoadingSubject = new Subject<Boolean>;
  pendingRequestDataSubject = new Subject<PendingRequest[]>;
  allRequestLoadingSubject = new Subject<Boolean>;
  allRequestDataSubject = new Subject<CompletedRequest[]>;
  constructor(private httpClient: HttpClient) {}

  getPendingRequestData(search: String) {
    // setTimeout(() => {
    //   this.pendingRequestDataSubject.next(this.testData);
    //   this.pendingRequestLoadingSubject.next(false);
    // } ,500)
    // return;
    this.httpClient.get<{message: String, data:PendingRequest[]}>(environment.backendUrl + '/pending?search=' + search)
      .subscribe((response) => {
        this.pendingRequestDataSubject.next(response.data);
        this.pendingRequestLoadingSubject.next(false);
      })
  }

  putRequestAction(id: String, action: String) {
    // setTimeout(() => {
    //   this.pendingRequestLoadingSubject.next(false);
    // }, 500)
    // return;
    const requestBody = {
      id: id,
      action: action
    }
    this.httpClient.put<{message: String, data: any}>(environment.backendUrl + '/pending', requestBody)
      .subscribe((response) => {
        this.getPendingRequestData('');
      })
  }

  getAllRequestData(search: String) {
    // setTimeout(() => {
    //   this.allRequestDataSubject.next(this.testData1);
    //   this.allRequestLoadingSubject.next(false);
    // }, 500)
    // return;
    this.httpClient.get<{message: String, data: CompletedRequest[]}>(environment.backendUrl + '/all-request?search=' + search)
      .subscribe((response) => {
        this.allRequestDataSubject.next(response.data);
        this.allRequestLoadingSubject.next(false);
      })
  }

  getPendingRequestDataObservable() {
    return this.pendingRequestDataSubject.asObservable();
  }

  getPendingRequestLoadingObservable() {
    return this.pendingRequestLoadingSubject.asObservable()
  }

  getAllRequestLoadingObservable() {
    return this.allRequestLoadingSubject.asObservable();
  }

  getAllRequestObservable() {
    return this.allRequestDataSubject.asObservable();
  }
}
