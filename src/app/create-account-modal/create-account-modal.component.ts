import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee, HttpClientService } from './../service/httpclient.service';
import { MatDialogRef } from '@angular/material';
import { Account } from './../classes/Account';
import { AccountService } from './../service/accountService/account.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.css']
})
export class CreateAccountModalComponent implements OnInit {

  users : Employee[];
  

  
  isCreationFailed  = false;
  isCreationSuccessful =  false;
  show: boolean;
  errorMessage = '';
  account: Account = new Account();
  accounts: Account[];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    private accountService : AccountService, 
    private httpClient : HttpClientService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.accounts = data.accounts;
        
        this.show =false;
        
     }


     
  ngOnInit() {

    this.httpClient.getEmployees().subscribe(
      response =>this.handleSuccessfulResponseUser(response),
     );
     
     console.log(this.users)
  }




  closeDialog(){ 
    this.dialogRef.close({event:'close'});
    
  }

  handleSuccessfulResponseUser(response)
  {
      this.users=response;
  }
  passwordShow() {
    this.show = !this.show;
  }


  onSubmit(){
    var userCreator: Employee = {id:0,username:'',firstname:'',lastname:'',password:''}
    userCreator.id = Number(JSON.parse(sessionStorage.getItem('auth-user')).id);
    userCreator.username = JSON.parse(sessionStorage.getItem('auth-user')).username;
    userCreator.firstname = JSON.parse(sessionStorage.getItem('auth-user')).firstname;
    userCreator.lastname = JSON.parse(sessionStorage.getItem('auth-user')).lastname;
    userCreator.password = JSON.parse(sessionStorage.getItem('auth-user')).password;

    this.account.user = userCreator;
    this.account.inServerPort = 995;
    this.account.inServerType = 1;
    this.account.smtpAddress = 'smtp.gmail.com'
    this.account.inServerAddress = 'pop.gmail.com'
    this.account.smtpPort = 465;
    console.log(this.account)
    this.accountService.createAccount(this.account).subscribe(
      data => {
        
            this.accounts.push(this.account);
             
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
