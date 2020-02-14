import { MessageService } from './../service/messageService/message.service';
import { Message } from './../classes/Message';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-message-modal',
  templateUrl: './delete-message-modal.component.html',
  styleUrls: ['./delete-message-modal.component.css']
})
export class DeleteMessageModalComponent implements OnInit {

  message: Message;
  messages: Message[];

  constructor(public dialogRef: MatDialogRef<DeleteMessageModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private messService : MessageService) {

      this.message = data.messToDelete;
      this.messages = data.messages;
     }

  ngOnInit() {
  }


  closeDialog(){ 
    this.dialogRef.close({event:'close'}); 
  }


  deleteMessage(){
    const index: number = this.messages.indexOf(this.message);
    if (index !== -1) {
        this.messages.splice(index, 1);
    }      
      this.messService.deleteMessage(this.message).subscribe(() => console.log("Message Deleted"));
      this.closeDialog();
  }

}
