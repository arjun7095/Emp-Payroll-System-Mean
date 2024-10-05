import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component';
import { AdminsComponent } from './admins/admins.component';


const routes: Routes = [
  
  { path: 'employees', component: EmployeesComponent },
  { path: 'admins', component: AdminsComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}