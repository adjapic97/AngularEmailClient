import { MainService } from './service/mainService/main.service';
import { MessageService } from './service/messageService/message.service';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Account } from './classes/Account';
import { AccountService } from './service/accountService/account.service';
import { TokenStorageService } from './service/token-storage.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authorities: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  accountsForUser: Account[];
  clickedAccount: Account[];
  isAccountChosen: boolean;
  emitClassListener = null;


  constructor(private mainService: MainService, private tokenStorageService: TokenStorageService, private accountService: AccountService,public dialog : MatDialog, private messageService : MessageService) { 
    this.isAccountChosen = false;
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.authorities = user.authorities;
      
      this.showAdminBoard = this.authorities.includes('ADMIN');
     /// this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;

      this.accountService.getAccountForUser(user.id).subscribe(
        response => this.handleSuccessfulResponse(response),
      ); 

      if(sessionStorage.getItem('selectedAccount') != null){
        this.clickedAccount = JSON.parse(sessionStorage.getItem('selectedAccount'));
        this.isAccountChosen = true;
      }
      

    }

    this.emitClassListener = this.mainService.emitClass.subscribe(
      response => {
   
      } 
    )
    
  }


  ngOnDestroy(){
    if(this.emitClassListener){
      this.emitClassListener.unsubscribe();
    }
  }

  handleSuccessfulResponse(response)
{
    this.accountsForUser=response;

}


showAccountsDetails(account){


  this.messageService.recieveMessages(account).subscribe(
     
  )
  if(window.sessionStorage.getItem('selectedAccount') != null){
    window.sessionStorage.removeItem('selectedAccount');
 }

  this.tokenStorageService.selectedAccount(account);
  console.log(window.sessionStorage.getItem('selectedAccount'));
  window.location.reload();
  

}


createAccountModal(){
  
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '550px';
  dialogConfig.backdropClass = 'custom-dialog-backdrop-class';
  dialogConfig.panelClass = 'custom-dialog-panel-class';
  dialogConfig.data = { accounts: this.accountsForUser};
  
  const createDialogRef = this.dialog.open(CreateAccountModalComponent, dialogConfig
    );

  createDialogRef.afterClosed().subscribe(result => {
   
    
      console.log('The dialog was closed');
         
    //this.dialogValue = result.data;
  });

}

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}