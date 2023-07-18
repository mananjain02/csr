import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-all-request',
  templateUrl: './student-all-request.component.html',
  styleUrls: ['./student-all-request.component.css'],
  providers: [StudentService]
})
export class StudentAllRequestComponent implements OnInit, OnDestroy {
  isLoading: Boolean = false;
  filter: String = "all";
  tableData: any;
  isLoadingSubscrition: Subscription;
  studentRequestDataSubscription: Subscription;
  tableColumns = ["id", "startDate", "endDate", "reason", "status"];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.studentRequestDataSubscription = this.studentService.getStudentRequestObservable()
      .subscribe((studentRequestData) => {
        this.tableData = studentRequestData;
        this.tableData.reverse();
      })
    this.isLoadingSubscrition = this.studentService.getStudentRequestLoadingObservable()
      .subscribe((loading) => {
        this.isLoading = loading;
      })
    this.studentService.getStudentRequestData(this.filter);
  }

  ngOnDestroy(): void {
    this.studentRequestDataSubscription.unsubscribe();
    this.isLoadingSubscrition.unsubscribe();
  }

  onChangeFilter(filter: String) {
    this.isLoading = true;
    this.filter = filter;
    this.studentService.getStudentRequestData(this.filter);
  }

  onRefresh() {
    this.isLoading = true;
    this.filter = "all";
    this.studentService.getStudentRequestData(this.filter);
  }
}
