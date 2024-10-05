import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  loggedIn: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router) { }
  handleDashboard(){
    this.loggedIn = true;
    this.router.navigate(['/adminDashboard']);
  }
}
