import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  email: string = '';
  password: string = '';
  loggedIn: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }
  handleRegister(){
    this.loggedIn = true;
    this.router.navigate(['/register']);
  }
  handleLogin(): void {
    if(this.email==''){
      alert('please provide email')
    }
    else if(this.password==''){
      alert('please provide password')
    }
    else{
    this.httpClient.post<any>('http://localhost:3004/api/login', { email: this.email, password: this.password })
      .subscribe({next:(response) => {
        const  role  = response.user.role;
        alert('Login Successful!!')
        if (role === 'employee') {
          this.router.navigate(['/employees']);
        } 
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } 
        this.loggedIn = true; 
        
        localStorage.setItem('email',this.email);
      }, error:(error) => {
        console.error('Login error:', error);
      }
    });
  }
}
}
