import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  leaveRequests: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchLeaveRequests();
  }

  fetchLeaveRequests() {
    const url = "http://localhost:3004/api/admin/new/leaves/";
    this.http.get<any[]>(url).subscribe(
      response => {
        this.leaveRequests = response.filter(leave => leave.status === 'Pending');
      },
      error => {
        this.error = error.message || 'An error occurred while fetching leave requests.';
      }
    );
  }

  handleStatusChange(index: number, newStatus: string) {
    const modifiedRequest = this.leaveRequests[index];
    modifiedRequest.status = newStatus;

    this.http.put(`http://localhost:3004/api/admin/leaves/${modifiedRequest._id}`, { status: newStatus })
      .subscribe(
        () => {
          this.leaveRequests.splice(index, 1);
        },
        error => {
          this.error = error.message || 'An error occurred while updating leave status.';
        }
      );
  }
}
