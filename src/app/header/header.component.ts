import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    console.log(this.role);
  }

}
