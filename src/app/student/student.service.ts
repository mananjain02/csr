import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { Subject } from "rxjs";

@Injectable()
export class StudentService {
  leaveFormLoading = new Subject<Boolean>;
  constructor(private httpClient: HttpClient,
    private dialog: MatDialog) {}

  sendLeaveRequest(startDate: Date, endDate: Date, reason: String) {
    console.log("leaveRequestSent");
    // setTimeout(() => {
    //   this.dialog.open(DialogComponent, {data: {message: "Submitted successfully!"}})
    //   this.leaveFormLoading.next(false);
    // }, 1000)
    // return;
    const requestBody = {
      startDate: startDate,
      endDate: endDate,
      reason: reason
    }
    this.httpClient.post<{message: String}>(environment.backendUrl + '/student', requestBody).subscribe((response) => {
      if(response.message=="FAILED") {
        this.leaveFormLoading.next(false);
        this.dialog.open(DialogComponent, {data: {message: "Failed to Submit!"}})
      } else {
        this.leaveFormLoading.next(false);
        this.dialog.open(DialogComponent, {data: {message: "submitted successfully!"}})
      }
    })
  }

  getLeaveFormLoadingObservable() {
    return this.leaveFormLoading.asObservable();
  }
}
