import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
    email: string = '';
    role: string = '';
    password: string = '';
  
    constructor(private httpClient: HttpClient) { }

    handleRegistration(): void {
     
      this.httpClient.post<any>('http://localhost:3004/api/register/employee',{username:this.username,email:this.email,role:this.role,password:this.password})
        .subscribe(resData => {
          alert(resData.status);
          this.username = '';
          this.email = '';
          this.role = '';
          this.password = '';
        });
    }

}
