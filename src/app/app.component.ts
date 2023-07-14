import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'holiday';

  ngOnInit(): void {
    localStorage.setItem("role", "student");
    localStorage.setItem("userId", "1234567890");
  }
}
