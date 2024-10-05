import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Schedule {
  empId: string;
  work: string;
  date: string;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleDetails: Schedule[] = [];
  error: string | null = null;
  date: string = '';
  empId: string | null = localStorage.getItem('empId');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWorkSchedule();
  }

  async getWorkSchedule(): Promise<void> {
    if (this.date && this.empId) {
      try {
        const response = await this.http.get<any>(`http://localhost:3004/api/schedule/${this.date}/${this.empId}`).toPromise();
        this.scheduleDetails = response.scheduleDetails;
        this.error = null;
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  private handleError(error: any): void {
    if (error.error && error.error.message) {
      this.error = error.error.message;
    } else {
      this.error = 'An error occurred while fetching work schedule.';
    }
  }

  onDateChange(event: Event): void {
    this.date = (event.target as HTMLInputElement).value;
    this.getWorkSchedule();
  }
}