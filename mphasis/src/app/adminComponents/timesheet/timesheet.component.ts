import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  timesheets: any[] = [];
  error: string | null = null;
  date: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTimesheets();
  }

  getTimesheets() :void{
    this.http.get<any>(`http://localhost:3004/api/admin/timesheet/${this.date}`)
      .subscribe(resData => {
        this.timesheets = resData.timeSheetData;
        this.error = null;
      
     } );
      
  }
}
