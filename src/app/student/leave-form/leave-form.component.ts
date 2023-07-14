import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit {
  currentDateTime: string;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor() { }

  ngOnInit(): void {
    this.currentDateTime = new Date().toISOString().split('.')[0];
  }

  onLeaveSubmit(leaveForm: NgForm) {
    console.log(leaveForm.value);
    // if(leaveForm.invalid) return;
  }

}
