import { ContactClientService } from './../service/contactServices/contact-client.service';
import { HttpClientService } from './../service/httpclient.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../classes/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
    
   
  constructor(
    private contactClientService:ContactClientService
  ) { }

  ngOnInit() {
     this.contactClientService.getContacts().subscribe(
      response =>this.handleSuccessfulResponse(response),
     );
  }

handleSuccessfulResponse(response)
{
    this.contacts=response;
}

deleteEmployee(contact: Contact): void {
   this.contactClientService.deleteContact(contact)
     .subscribe( data => {
      this.contacts = this.contacts.filter(u => u !== contact);
   })
}


}
