import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { Subject, retry } from "rxjs";
import { StudentRequest } from "./models/student-request.model";
import { StudentProfile } from "./models/student-profile.model";

@Injectable()
export class StudentService {
  leaveFormLoading = new Subject<Boolean>;

  studentRequestLoading = new Subject<Boolean>;
  studentRequestDataSubject = new Subject<StudentRequest[]>;

  studentProfileLoading = new Subject<Boolean>;
  studentProfileDataSubject = new Subject<StudentProfile>;
  studentProfileEditSubject = new Subject<Boolean>;

  constructor(private httpClient: HttpClient,
    private dialog: MatDialog) {}

  sendLeaveRequest(startDate: Date, endDate: Date, reason: String) {
    // comment
    // setTimeout(() => {
    //   this.dialog.open(DialogComponent, {data: {message: "Submitted successfully!"}})
    //   this.leaveFormLoading.next(false);
    // }, 1000)
    // return;

    const requestBody = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      reason: reason
    }
    console.log(requestBody);
    this.httpClient.post<{message: String, data: any}>(environment.backendUrl + '/student', requestBody)
    .subscribe((response) => {
      this.leaveFormLoading.next(false);
      this.dialog.open(DialogComponent, {data: {message: "submitted successfully!"}});
    },
    () => {
      this.leaveFormLoading.next(false);
      this.dialog.open(DialogComponent, {data: {message: "Invalid start date!"}})
    })
  }


  getStudentRequestData(filter: String) {
    // comment
    // setTimeout(() => {
    //   this.studentRequestDataSubject.next(this.testData);
    //   this.studentRequestLoading.next(false);
    // },1000)
    // return;

    this.httpClient.get<{message: String, data: StudentRequest[]}>(environment.backendUrl + '/student-request?filter='+filter)
    .subscribe((response) => {
      this.studentRequestDataSubject.next(response.data);
      this.studentRequestLoading.next(false);
    })
  }

  getStudentProfileData() {
    // comment
    // setTimeout(() => {
    //   const studentDetail: StudentProfile = {
    //     name: "sdfjl",
    //     phoneNumber: "sdfsd",
    //     address: "sdfjsdlkf"
    //   }
    //   this.studentProfileDataSubject.next(studentDetail);
    //   this.studentProfileLoading.next(false);
    // }, 500)
    // return;

    this.httpClient.get<{message: String, data: StudentProfile}>(environment.backendUrl + '/student-detail')
      .subscribe((response) => {
        this.studentProfileDataSubject.next(response.data);
        this.studentProfileLoading.next(false);
      })
  }

  putStudentProfileData(name: String, phoneNumber: String, address: String) {
    const studentDetail: StudentProfile = {
      name: name,
      phoneNumber: phoneNumber,
      address: address
    }

    // comment
    // setTimeout(() => {
    //   this.studentProfileDataSubject.next(studentDetail);
    //   this.studentProfileLoading.next(false);
    //   this.studentProfileEditSubject.next(false);
    // }, 500)
    // return;

    this.httpClient.put<{message: String, data: any}>(environment.backendUrl + '/student-detail', studentDetail)
      .subscribe((response) => {
        this.studentProfileDataSubject.next(studentDetail);
        this.studentProfileLoading.next(false);
        this.studentProfileEditSubject.next(false);
      })
  }

  getLeaveFormLoadingObservable() {
    return this.leaveFormLoading.asObservable();
  }

  getStudentRequestLoadingObservable() {
    return this.studentRequestLoading.asObservable();
  }
  
  getStudentProfileLoadingObservable() {
    return this.studentProfileLoading.asObservable();
  }

  getStudentRequestObservable() {
    return this.studentRequestDataSubject.asObservable();
  }

  getStudentDataObservable() {
    return this.studentProfileDataSubject.asObservable();
  }

  getStudentEditObservable() {
    return this.studentProfileEditSubject.asObservable();
  }
}
