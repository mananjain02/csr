import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  sendLeaveRequest() {
    console.log("leaveRequestSent");
  }
}
