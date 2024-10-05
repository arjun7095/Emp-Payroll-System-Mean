// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee-dashboard',
//   templateUrl: './employee-dashboard.component.html',
//   styleUrls: ['./employee-dashboard.component.css']
// })
// export class EmployeeDashboardComponent {

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class ProfileComponent implements OnInit {
  employee: any = {};
  name: string = '';
  category: string = '';
  salary: string = '';
  address: string = '';
  message: string = '';
  empId:string='';
  email:string='';
  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  async fetchEmployeeData() {

    this.httpClient.get<any>(`http://localhost:3004/api/employee/${localStorage.getItem('email')}`)
        .subscribe(resData => {
            this.employee = resData.employee;
           
            localStorage.setItem('empId',this.employee.empId)
         } );
  }

  handleUpdateName():void {
   this.httpClient.put(`http://localhost:3004/api/employee/${this.employee._id}`, { name: this.name,category:this.category,address:this.address })
   .subscribe(resdata=>{
    this.fetchEmployeeData();
    this.name = '';
   this.empId='';
    this.email='';
    this.category='',
    this.address='';

   })
     
    
  }

  async handleAddDetails() {
    this.httpClient.post('http://localhost:3004/api/employee', {
        empId: parseInt(this.empId), 
        email: localStorage.getItem('email'),
        name: this.name,
        category: this.category,
        address: this.address

  })
}
}
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-employee-dashboard',
//   templateUrl: './employee-dashboard.component.html',
//   styleUrls: ['./employee-dashboard.component.css']
// })
// export class EmployeeDashboardComponent implements OnInit {
//   employee: any = {};
//   name: string = '';
//   category: string = '';
//   salary: string = '';
//   address: string = '';
//   message: string = '';
//   empId: string = '';
//   email: string = ''; // Add email property

//   constructor(private httpClient: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchEmployeeData();
//   }

//   fetchEmployeeData(): void {
//     this.httpClient.get<any>(`http://localhost:3004/api/employee/${this.email}`) // Use email directly
//       .subscribe(
//         (response) => {
//           if (response.data.employee.length === 0) {
//             this.message = 'Your profile is incomplete, please provide your details';
//           } else {
//             this.employee = response.data.employee[0];
//             localStorage.setItem('empId', this.employee.empId);
//             this.message = '';
//           }
//         },
//         (error) => {
//           console.error('Error fetching employee data:', error);
//           this.message = 'Error fetching employee data';
//         }
//       );
//   }

//   handleUpdateName(): void {
//     this.httpClient.put(`http://localhost:3004/api/employee/${this.employee._id}`, { name: this.name })
//       .subscribe(
//         () => {
//           this.fetchEmployeeData();
//           this.name = '';
//         },
//         (error) => {
//           console.error('Error updating employee data:', error);
//           this.message = 'An error occurred while updating employee data.';
//         }
//       );
//   }

//   handleDeleteAccount(): void {
//     this.httpClient.delete(`http://localhost:3004/api/employee/${this.employee._id}`)
//       .subscribe(
//         () => {
//           this.message = 'Employee account deleted successfully';
//           this.employee = {};
//         },
//         (error) => {
//           console.error('Error deleting employee account:', error);
//           this.message = 'An error occurred while deleting employee account.';
//         }
//       );
//   }

//   handleAddDetails(): void {
//     if (!this.empId || !this.name || !this.category || !this.salary || !this.address || !this.email) { // Check if email is filled
//       this.message = 'Please fill in all required fields.';
//       return;
//     }

//     this.httpClient.post('http://localhost:3004/api/employee', {
//       empId: this.empId, 
//       email: this.email, // Use email directly
//       name: this.name,
//       category: this.category,
//       salary: this.salary,
//       address: this.address
//     })
//     .subscribe(
//       (response: any) => {
//         this.employee = response.data.employee;
//         this.message = 'Employee details added successfully';
//       },
//       (error) => {
//         console.error('Error adding employee details:', error);
//         this.message = 'An error occurred while adding employee details.';
//       }
//     );
//   }
// }



  