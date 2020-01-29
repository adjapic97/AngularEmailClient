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

  getPageMessage(page:number): void {
    this.messService.getPageMessage(page)
        .subscribe(page => this.pageMessage = page)
  
  }
  constructor(private messService : MessageService) { 

  }
/*   onSelect(page: number): void {
    console.log("selected page : "+page);
    this.selectedPage=page;
    this.getPageMessage(page);
  } */
  ngOnInit() {
     //this.getClient();
     //this.getPageMessage(0);
      this.messService.getMessages().subscribe(
       response => this.handleSuccessfulResponse(response),
     ); 

    
     
  }


  handleSuccessfulResponse(response)
{
    this.messages=response;

}


clickMessage(message){
  console.log(message.content);
  message.unread = !message.unread;

}

clickMessage2(message){
  console.log("delete");
}

downloadAttachment(){
  console.log("downloading...");
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