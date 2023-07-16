import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentProfile } from '../models/student-profile.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [StudentService]
})
export class EditProfileComponent implements OnInit, OnDestroy {
  edit: Boolean = false;
  studentDataEditSubscription: Subscription;
  isLoading: Boolean = false;
  isLoadingSubscription: Subscription;
  studentData: StudentProfile;
  editStudentData: StudentProfile;
  studentDataSubscription: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.studentDataSubscription = this.studentService.getStudentDataObservable()
      .subscribe((data) => {
        this.studentData = data;
        this.editStudentData = Object.assign({}, data);
      })
    this.isLoadingSubscription = this.studentService.getStudentProfileLoadingObservable()
      .subscribe((loading) => {
        this.isLoading = loading;
      })
    this.studentDataEditSubscription = this.studentService.getStudentEditObservable()
      .subscribe((edit) => {
        this.edit = edit;
      })

    this.studentService.getStudentProfileData();
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
    this.studentDataSubscription.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    this.studentService.putStudentProfileData(this.editStudentData.name, this.editStudentData.phoneNumber, this.editStudentData.address);
  }

  onCancel() {
    this.edit = false;
    this.editStudentData = Object.assign({}, this.studentData);
  }

  onEdit() {
    this.edit = true;
  }
}
