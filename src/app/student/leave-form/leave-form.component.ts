import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { StudentService } from '../student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css'],
  providers: [StudentService]
})
export class LeaveFormComponent implements OnInit, OnDestroy {
  currentDateTime: string;
  isLoading: Boolean = false;
  isLoadingSubscription: Subscription;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // this.isLoading = true;
    this.currentDateTime = new Date().toISOString().split('.')[0];
    this.isLoadingSubscription = this.studentService.getLeaveFormLoadingObservable()
      .subscribe((loading: Boolean) => {
        this.isLoading = loading;
      })
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }

  onLeaveSubmit(leaveForm: NgForm) {
    if(leaveForm.invalid) return;
    this.isLoading = true;
    const startDate = new Date(leaveForm.value.startDate);
    const endDate = new Date(leaveForm.value.endDate);
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);
    this.studentService.sendLeaveRequest(startDate, endDate, leaveForm.value.reason)
  }

}
