import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from './../service/accountService/account.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.css']
})
export class DeleteAccountModalComponent implements OnInit {


  account: Account;
  accounts: Account[];

  constructor(public dialogRef: MatDialogRef<DeleteAccountModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private accService : AccountService) {

      this.account = data.accountToDelete;
      this.accounts = data.accounts;
     }

  ngOnInit() {
  }


  closeDialog(){ 
    this.dialogRef.close({event:'close'}); 
  }


  deleteAccount(){
    const index: number = this.accounts.indexOf(this.account);
    if (index !== -1) {
        this.accounts.splice(index, 1);
    }      
      this.accService.deleteAccount(this.account).subscribe(() => console.log("Account Deleted"));
      this.closeDialog();
  }

}
