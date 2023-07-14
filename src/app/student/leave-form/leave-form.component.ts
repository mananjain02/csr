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
    this.studentService.sendLeaveRequest(leaveForm.value.startDate, leaveForm.value.endDate, leaveForm.value.reason)
  }

}
