import { Component } from '@angular/core';

@Component({
  selector: 'app-empnav',
  templateUrl: './empnav.component.html',
  styleUrl: './empnav.component.css'
})
export class EmpnavComponent {
  handleLogout(){
    window.location.href='http://localhost:4200/';
  }
}
