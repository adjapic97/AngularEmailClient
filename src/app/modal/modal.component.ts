import { AccountService } from './../service/accountService/account.service';
import { Account } from './../classes/Account';
import { Component, Inject, Optional, OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  fromPage:string;
  fromDialog:string;
  username:string;
  account: Account[];
  show: boolean;

  //update
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private accountService : AccountService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.fromPage = data.pageValue;
      this.account = data.account;
      this.show = false;
    }
    
  ngOnInit() {
  }
 
  closeDialog(){ 
    this.dialogRef.close({event:'close',data:this.account}); 
  }

  updateAccount(){
      this.accountService.update(this.account);
      console.log(this.account);

  }

  passwordShow() {
    this.show = !this.show;
  }


onSubmit() {
  this.accountService.update(this.account).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  );
}

}
