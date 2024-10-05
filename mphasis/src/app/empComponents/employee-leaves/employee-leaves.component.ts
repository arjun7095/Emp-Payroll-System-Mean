// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee-leaves',
//   templateUrl: './employee-leaves.component.html',
//   styleUrls: ['./employee-leaves.component.css']
// })
// export class EmployeeLeavesComponent {

// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.css']
})
export class EmployeeLeavesComponent {
  empId: string = '';
  name: string = '';
  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  reason: string = '';
  status: string = 'Pending';
  minDate:string='';

  constructor(private httpClient: HttpClient) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  async handleSubmit(): Promise<void> {
    const leaveData = {
      empId: parseInt(this.empId),
      name: this.name,
      leaveType: this.leaveType,
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason,
      status: this.status
    };

    try {
      await this.httpClient.post('http://localhost:3004/api/employee/leave', leaveData).toPromise();
      alert('Leave application submitted successfully!');
      // Reset form after submission
      this.resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit leave application. Please try again later.');
    }
  }

  resetForm(): void {
    this.empId = '';
    this.name = '';
    this.leaveType = '';
    this.startDate = '';
    this.endDate = '';
    this.reason = '';
    this.status = 'Pending';
  }
}

