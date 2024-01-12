import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 Registereddata :any=[];
 dataTable:any;
 deleteduser:any;
 constructor(private apiService: ApiserviceService,private cdr: ChangeDetectorRef){}
 ngOnInit(){
  this.GetRegisteredUser();
 }

 GetRegisteredUser(): void {
  debugger
  this.apiService.getData('/api/User/GetAllRegisteredUser').subscribe(
    (response) => {
      debugger;
      if (this.dataTable) {
        this.dataTable.destroy();
      }
      this.Registereddata=response.response;
      this.cdr.detectChanges();
      const table: any = $('.dataTableASR');
      this.dataTable = table.DataTable({
        "order": [[8, "desc"]],
        "scrollX": true,
        language: {
          emptyTable: "No data available"
        }
      });
     
    },
  );
}

DeleteUser(value: any) {
  debugger
  this.apiService.deleteData('/api/User/DeleteUser/' + value).subscribe(
    (response) => {
      this.deleteduser = response.response;
    }
  );
}

 }



