import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  loggedIn: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router) { }
  handleDashboard(){
    this.loggedIn = true;
    this.router.navigate(['/profile']);

}
}