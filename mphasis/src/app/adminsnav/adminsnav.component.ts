import { Component } from '@angular/core';

@Component({
  selector: 'app-adminsnav',
  templateUrl: './adminsnav.component.html',
  styleUrl: './adminsnav.component.css'
})
export class AdminsnavComponent {
  handleLogout(){
    window.location.href='http://localhost:4200/';
  }
}
