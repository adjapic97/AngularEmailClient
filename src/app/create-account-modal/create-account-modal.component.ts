import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee, HttpClientService } from './../service/httpclient.service';
import { MatDialogRef } from '@angular/material';
import { Account } from './../classes/Account';
import { AccountService } from './../service/accountService/account.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.css']
})
export class CreateAccountModalComponent implements OnInit {

  users : Employee[];
  newAccount : Account[];
  isCreationFailed  = false;
  isCreationSuccessful =  false;

  errorMessage = '';


  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    private accountService : AccountService, 
    private httpClient : HttpClientService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.users = data.dataUsers;
     }

  ngOnInit() {
    
  }




  closeDialog(){ 
    this.dialogRef.close({event:'close'});
    
  }


  onSubmitCreate(){
    this.accountService.createAccount(this.newAccount).subscribe(
      data => {
        console.log(data);
        this.isCreationSuccessful = true;
        this.isCreationFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isCreationFailed = true;
      }
    );
  }

}
