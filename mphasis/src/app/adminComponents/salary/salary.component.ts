import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  employees: any[] = [];
  selectedMonth: string = '';
  selectedYear: string = '';
  salaryData: any[] = [];
  error: string | null = null;
  newSalary: number | null = null;
  newEmpId: string = '';
  newName:string='';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const url = "http://localhost:3004/api/admin/employees";
    this.http.get<any[]>(url).subscribe(
      response => {
        this.employees = response || [];
        this.error = null;
      },
      error => {
        this.error = error.message || 'An error occurred while fetching employees.';
      }
    );
  }

  handleGetSalary() {
    if (this.selectedMonth && this.selectedYear) {
      const url = `http://localhost:3004/api/admin/salary/${this.selectedYear}/${this.selectedMonth}`;
      this.http.get<any>(url).subscribe(
        resData => {
          this.salaryData = resData.salaryData || [];
          this.error = null;
        },
        error => {
          this.error = error.error?.error || 'An error occurred while fetching salary data.';
        }
      );
    } else {
      this.error = 'Please select both month and year.';
    }
  }

  updateSalary(empId: string) {
    if (this.newSalary !== null) {
      const url = `http://localhost:3004/api/admin/salary/${empId}/${this.selectedYear}/${this.selectedMonth}`;
      this.http.put(url, { salary: this.newSalary }).subscribe(
        () => {
          this.handleGetSalary();
          this.newSalary = null;
        },
        error => {
          this.error = error.error?.error || 'An error occurred while updating salary.';
        }
      );
    } else {
      this.error = 'Please enter a valid salary.';
    }
  }

  deleteSalary(empId: string) {
    const url = `http://localhost:3004/api/admin/salary/${empId}/${this.selectedYear}/${this.selectedMonth}`;
    this.http.delete(url).subscribe(
      () => {
        this.handleGetSalary();
      },
      error => {
        this.error = error.error?.error || 'An error occurred while deleting salary.';
      }
    );
  }

  addSalary() {
    if (this.newEmpId && this.newSalary && this.newName !== null) {
      const url = `http://localhost:3004/api/admin/salary/${this.selectedYear}/${this.selectedMonth}`;
      this.http.post(url, { empId: this.newEmpId,name:this.newName, salary: this.newSalary }).subscribe(
        () => {
          this.handleGetSalary();
          this.newEmpId = '';
          this.newName='';
          this.newSalary = null;
        },
        
      );
    } else {
      this.error = 'Please enter both employee ID and salary.';
    }
  }

  calculatePFDeduction(salary: number) {
    return salary * 0.12; // Assuming PF deduction is 12% of the salary
  }

  calculateTaxDeduction(salary: number) {
    return salary * 0.1; // Assuming tax deduction is 10% of the salary
  }
}
