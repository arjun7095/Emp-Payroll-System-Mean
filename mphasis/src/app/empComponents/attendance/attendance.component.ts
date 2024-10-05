
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  empId: string = '';
  punchInTime: string = '';
  punchOutTime: string = '';
  date: string = '';
  duration: number | null = null;
  error: string = '';
  successMessage: string = '';
  minDate:string='';

  constructor(private httpClient: HttpClient) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  // Function to calculate duration whenever punchInTime or punchOutTime changes
  calculateDuration(): void {
    if (this.punchInTime && this.punchOutTime) {
      const punchIn = moment(`${this.date} ${this.punchInTime}`);
      const punchOut = moment(`${this.date} ${this.punchOutTime}`);
      this.duration = punchOut.diff(punchIn, 'hours', true);
    } else {
      this.duration = null;
    }
  }

  // Function to handle attendance submission
  handleAttendanceSubmit(): void {
    this.calculateDuration(); // Calculate duration before submitting

    // Create attendance data object
    const attendanceData = {
      empId: this.empId,
      punchIn: `${this.date} ${this.punchInTime}`,
      punchOut: `${this.date} ${this.punchOutTime}`,
      date: this.date,
      duration: this.duration
    };

    // Send HTTP POST request to submit attendance
    this.httpClient.post<any>('http://localhost:3004/api/attendance', attendanceData)
      .subscribe(
        response => {
          this.successMessage = response.message;
          this.error = '';
        },
       
      );
  }
}






