import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class EmpSalaryComponent implements OnInit {
  salaryData: any[] = [];
  month: string = '';
  year: string = '';
  error: string | null = null;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchSalaryData(): void {
    const empId = parseInt(localStorage.getItem('empId') || '0');
    if (this.month && this.year) {
      let url = `http://localhost:3004/api/employee/salary/${empId}/${this.year}/${this.month}`;
      this.http.get(url)
        .subscribe({
          next: (response: any) => {
            this.salaryData = response.salaryData || [];
            this.error = null;
          },
          error: (error) => {
            this.error = error.error?.error || 'An error occurred while fetching salary data.';
          }
        });
    }
  }
  

  calculatePFDeduction(salary: number): number {
    return salary * 0.12;
  }

  calculateTaxDeduction(salary: number): number {
    return salary * 0.1;
  }

  downloadPDF(): void {
    html2canvas(document.getElementById('salary-table') as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf();
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('salary-details.pdf');
    });
  }
}