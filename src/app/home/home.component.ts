import { Photo } from './../classes/Photo';
import { ImageService } from './../service/imageService/image.service';
import { DeleteMessageModalComponent } from './../delete-message-modal/delete-message-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from './../service/token-storage.service';
import { Attachment } from './../classes/Attachment';
import { AttachmentService } from './../service/attachmentService/attachment.service';
import { PageMessage } from './../classes/PageMessage';
import { MessageService } from './../service/messageService/message.service';
import { Message } from './../classes/Message';
import { UserService } from './../service/userServices/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  messages: Message[];
  pageMessage : PageMessage;
  selectedPage : number = 0;
  message: Message[];
  attachments: Attachment[];
  clickMess: Message[];
  isItClicked: boolean;
  originalValue= 'Message';
  selectedAccount: Account[];
 

  getPageMessage(page:number): void {
    this.messService.getPageMessage(page)
        .subscribe(page => this.pageMessage = page)
  
  }
  constructor(private messService : MessageService, private tokenStorage: TokenStorageService, private attachmentService : AttachmentService,public dialog : MatDialog) { 
    this.isItClicked = false;
  }
/*   onSelect(page: number): void {
    console.log("selected page : "+page);
    this.selectedPage=page;
    this.getPageMessage(page);
  } */
  ngOnInit() {

     //this.getClient();
     //this.getPageMessage(0);

     if(window.sessionStorage.getItem('selectedAccount') == null){
        console.log("choose account to see messages");
       
     }
     else{
      this.messService.getMessagesForAccount(JSON.parse(sessionStorage.getItem('selectedAccount')).id).subscribe(
        response => this.handleSuccessfulResponse(response),
       );
       
     }
   


    this.originalValue = 'message';
     
  }



  handleSuccessfulResponse(response)
{
    this.messages=response;

}

handleSuccessfulResponseAttachment(response){
  this.attachments = response;
}




clickMessage(message){
  this.isItClicked = !this.isItClicked;
  console.log(message.content);
  message.unread = !message.unread;
  this.attachmentService.getAttachmentsForMessage(message.id).subscribe(
    response => this.handleSuccessfulResponseAttachment(response),
  );

 this.clickMess = message;

}

clickMessage2(message){
  console.log("delete");
}

downloadAttachment(attachment){
  console.log("downloading: " + attachment.name);
}

deleteMessageModal(message){
  const deleteDialogRef = this.dialog.open(DeleteMessageModalComponent, {
    width: '350px',
    backdropClass:'custom-dialog-backdrop-class',
    panelClass:'custom-dialog-panel-class',
    data: {messToDelete : message, messages: this.messages}
    
  })
  console.log("delete this message: " + message.subject)
}









/*   ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  } */
}