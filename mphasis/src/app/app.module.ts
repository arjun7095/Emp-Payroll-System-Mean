import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule ,HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { AdminsComponent } from './admins/admins.component';
import { RegisterComponent } from './register/register.component';
import { EmpnavComponent } from './empnav/empnav.component';

//~~~~~~~~~~~~~~~Admin Components~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { AdminsnavComponent } from './adminsnav/adminsnav.component';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { LeavesComponent } from './adminComponents/leaves/leaves.component';
import { SalaryComponent } from './adminComponents/salary/salary.component';
import { WorkScheduleComponent } from './adminComponents/work-schedule/work-schedule.component';
import { TimesheetComponent } from './adminComponents/timesheet/timesheet.component';
//~~~~~~~~~~~~~~~Employee Components~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { ProfileComponent } from './empComponents/employee-dashboard/employee-dashboard.component';
import { AttendanceComponent } from './empComponents/attendance/attendance.component';
import { EmployeeLeavesComponent } from './empComponents/employee-leaves/employee-leaves.component';
import { ScheduleComponent } from './empComponents/schedule/schedule.component';
import { EmployeeTimesheetComponent } from './empComponents/employee-timesheet/employee-timesheet.component';
import { EmpSalaryComponent } from './empComponents/salary/salary.component';


const routes: Routes = [
  
  { path: 'admin', component: AdminsComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'employee', component: EmployeesComponent },
  
//~~~~~~~~~~~~~~~Admin Components~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  { path: 'adminsnav', component: AdminsnavComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'salary', component: SalaryComponent },
  { path: 'workSchedule', component: WorkScheduleComponent },
  { path: 'timeSheet', component:TimesheetComponent },
//~~~~~~~~~~~~~~~Employee Components~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  { path: 'empnav', component: EmpnavComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'attendance', component:AttendanceComponent },
  { path: 'empLeaves', component:EmployeeLeavesComponent },
  { path: 'schedule', component:ScheduleComponent },
  { path: 'empTimesheet', component:EmployeeTimesheetComponent },
  { path: 'empSalary', component:EmpSalaryComponent },
    
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    EmployeesComponent,
    AdminsComponent,
    RegisterComponent,
    EmpnavComponent,
//~~~~~~~Admin components~~~~~~~~~~~~~~~~
    AdminsnavComponent,
    AdminDashboardComponent,
    LeavesComponent,
    SalaryComponent,
    WorkScheduleComponent,
    TimesheetComponent,
//~~~~~~Employee components~~~~~~~~~~
    ProfileComponent,
    AttendanceComponent,
    EmployeeLeavesComponent,
    ScheduleComponent,
    EmployeeTimesheetComponent,
    EmpSalaryComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
   provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
