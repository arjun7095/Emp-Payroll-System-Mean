import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent {
  empId: string = '';
  work: string = '';
  date: string = '';
  error: string | null = null;
  successMessage: string = '';
  resultArray: any[] = [];
  minDate:string='';
  constructor(private httpClient: HttpClient) {
    
      // Set the minimum date to today's date
      this.minDate = new Date().toISOString().split('T')[0];
  
   }
  // formatDate(dateString: string): string {
  //   const formattedDate = new Date(dateString);
  //   const year = formattedDate.getFullYear();
  //   const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(formattedDate.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }

  handleAssignWork():void {
    
      alert(this.date)
      // const formattedDate = this.formatDate(this.date);
      this.httpClient.post<any>('http://localhost:3004/api/admin/assign', {empId: this.empId,work: this.work, date:this.date})
      
      .subscribe(resData => {
        this.successMessage = resData.data;
      this.error = null;
      });
    
  }

  handleGetWorkSchedule(): void {
   
      this.httpClient.get<any>(`http://localhost:3004/api/admin/${this.date}`)
        .subscribe(resData => {
            this.resultArray = resData.workSchedule;
            this.error = null;
          
         } );
    
  }
}
