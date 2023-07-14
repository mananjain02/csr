import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'holiday';

  ngOnInit(): void {
    localStorage.setItem("role", "student");
    localStorage.setItem("userId", "1234567890");
  }
}
