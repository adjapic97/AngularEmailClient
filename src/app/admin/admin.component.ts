import { HttpClientService, Employee } from './../service/httpclient.service';
import { CreateAccountModalComponent } from './../create-account-modal/create-account-modal.component';
import { ModalComponent } from './../modal/modal.component';
import { AccountService } from './../service/accountService/account.service';
import { TokenStorageService } from './../service/token-storage.service';
import { UserService } from './../service/userServices/user.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private authorities: string[];
  content = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  accounts: Account[];
  account: Account[];
  andor : boolean;
  byusername: boolean;
  byemail: boolean;
  bydisplayname;
  fuzzysearch: boolean;
  booleanSearch: boolean;
  newAccount: any = {};
  dialogValue:string; 
  sendValue:string;
  users : Employee[];
  numbers;
  searchBy: string;

  /* Pagination Tryout */
  

  constructor(private userService: UserService, 
    private tokenService: TokenStorageService,
    private accountService : AccountService,
    public dialog : MatDialog,
    private httpClientService : HttpClientService
    ) { 
      this.andor =false;
      this.byusername = false;
      this.bydisplayname = false;
      this.byemail = false;
      this.fuzzysearch = false;
      this.booleanSearch = false;
      this.numbers = Array(5).fill(5).map((x,i)=>i); // [0,1,2,3,4]
    }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.authorities = user.authorities;
      
      this.showAdminBoard = this.authorities.includes('ADMIN');
     /// this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
  
        
   
    }


    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;

      }
    );


    this.accountService.getAccounts(0).subscribe(
      response => this.handleSuccessfulResponse(response),
    );

   


  }

  handleSuccessfulResponse(response)
  {
      this.accounts=response;
  }


  handleSuccessfulResponseUser(response)
  {
      this.users=response;
  }


  andOr(): void{
    this.andor = !this.andor;
    this.byusername = false;
    this.searchBy = 'andor'
    if(this.andor == false){
      console.log("andor search closed");
    }
    else{
      console.log("andor search opened");
      console.log(this.searchBy)
    }
    
  }

  
  clickNext(page: number){
    this.accountService.getAccounts(page).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }


  searchByUsername(): void{
    this.byusername = !this.byusername;
    this.andor = false;
    this.bydisplayname = false;
    this.byemail = false;
    this.booleanSearch = false;
    this.fuzzysearch = false;
    this.searchBy = 'username';
    console.log(this.searchBy)
  }


  openDialog(account): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
      data: {pageValue: this.sendValue, account}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.dialogValue = result.data;
    });
  }


  openCreateDialog(): void {
    const createDialogRef = this.dialog.open(CreateAccountModalComponent, {
      width: '550px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
      data: { accounts: this.accounts}
      
    });

    createDialogRef.afterClosed().subscribe(result => {
     
      
        console.log('The dialog was closed');
           
      //this.dialogValue = result.data;
    });


  }


  deleteAccountModal(account){
    const deleteDialogRef = this.dialog.open(DeleteAccountModalComponent, {
      width: '350px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
      data: {accountToDelete : account, accounts: this.accounts}
      
    })
    console.log("delete this account: " + account.username)
  }




}