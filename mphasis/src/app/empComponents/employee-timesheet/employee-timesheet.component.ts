import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import './employee-timesheet.component.css';

interface Timesheet {
  date: string;
  punchIn: string;
  punchOut: string;
  duration: number;
}

@Component({
  selector: 'app-employee-timesheet',
  templateUrl: './employee-timesheet.component.html',
  styleUrls: ['./employee-timesheet.component.css']
})
export class EmployeeTimesheetComponent implements OnInit {
  empId: string = '';
  timesheets: Timesheet[] = [];
  error: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Get empId from local storage
    const empIdFromStorage = localStorage.getItem('empId');
    if (empIdFromStorage) {
      this.empId = empIdFromStorage;
      this.fetchTimesheets();
    }
  }

  fetchTimesheets() {
    // Fetch timesheet details for the specific empId
    let url=`http://localhost:3004/api/timesheets/${this.empId}`
    this.http.get<any>(url)
      .subscribe(
        response => {
          this.timesheets = response.timesheets;
          this.error = '';
        },
       
      );
  }
}