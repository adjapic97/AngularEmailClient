import { ContactClientService } from './../service/contactServices/contact-client.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Contact } from './../classes/Contact';
import { Component, OnInit, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-delete-contact-modal',
  templateUrl: './delete-contact-modal.component.html',
  styleUrls: ['./delete-contact-modal.component.css']
})
export class DeleteContactModalComponent implements OnInit {


  contact: Contact;
  contacts: Contact[];

  constructor(public dialogRef: MatDialogRef<DeleteContactModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private clientService : ContactClientService) {

      this.contact = data.contactToDelete;
      this.contacts = data.contacts;
     }

  ngOnInit() {
  }


  closeDialog(){ 
    this.dialogRef.close({event:'close'}); 
  }


  deleteContact(){
    const index: number = this.contacts.indexOf(this.contact);
    if (index !== -1) {
        this.contacts.splice(index, 1);
    }      
      this.clientService.deleteContact(this.contact).subscribe(() => console.log("Contact Deleted"));
      this.closeDialog();
  }

}
