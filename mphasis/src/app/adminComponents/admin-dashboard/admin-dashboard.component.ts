import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  EmpArray: any[] = [];
  empId: string = "";
  name: string = "";
  email: string = "";
  category: string = "";
  securityQuestion: string = "";
  password: string = "";
  salary: string = "";
  address: string = "";
  selectedEmp: any = null;
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  getDataButton_click() {
    let url = "http://localhost:3004/api/admin/employees/";
    this.http.get(url).subscribe((resData: any) => {
      this.EmpArray = resData;
    });
  }

  updateEmp_click() {
    if (!this.selectedEmp) {
      alert("Please choose the record you want to update");
      return;
    }

    const updatedEmp = {
      empId:this.empId,
      name: this.name,
     
      category: this.category,
      
      address: this.address,
    };

    const url = "http://localhost:3004/api/admin/employees/";

    this.http.put(url, updatedEmp).subscribe((resData: any) => {
      alert(resData.status);
      this.getDataButton_click();
      this.clearFields();
      this.selectedEmp = null;
    });
  }

  editEmp(emp: any) {
    this.empId = emp.empId;
    this.name = emp.name;
    this.email = emp.email;
    this.category = emp.category;
  
    this.address = emp.address;
    this.selectedEmp = emp;
  }

  deleteEmp_click(empId: string) {
    let flag = window.confirm("Are you sure want to delete?");
    if (flag == false) {
      return;
    }

    let url = "http://localhost:3004/api/admin/employees/" + empId;
    this.http.delete(url).subscribe((resData: any) => {
      alert(resData.status);
      this.getDataButton_click();
    });
  }

  

  clearFields() {
    this.empId = "";
    this.name = "";
    this.email = "";
    this.category = "";
    this.address = "";
  }

  trackByEmpId(index: number, item: any): string {
    return item.empId;
  }
}
