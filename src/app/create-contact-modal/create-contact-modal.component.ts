import { HttpClientService, Employee } from './../service/httpclient.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/classes/contact';
import { ContactClientService } from './../service/contactServices/contact-client.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-create-contact-modal',
  templateUrl: './create-contact-modal.component.html',
  styleUrls: ['./create-contact-modal.component.css']
})
export class CreateContactModalComponent implements OnInit {

  fromPage:string;
  fromDialog:string;
  username:string;

  show: boolean;

  //update
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  create: boolean;
  update: boolean;
  users: Employee[];
  contactChoose: Contact;
  contact: Contact = new Contact();
  choosenUser: Employee;
  contacts: Contact[];
  
  constructor(
    public dialogRef: MatDialogRef<CreateContactModalComponent>,
    private contactService : ContactClientService,
    private http : HttpClientService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
     if(data.update){
      this.contactChoose = data.contact;
      this.create = data.create;
      this.update = data.update;
     }else{
       this.create = data.create;
       this.update = data.update;
     }
      
      this.show = false;
    }
    
  ngOnInit() {

    this.http.getEmployees().subscribe(
      response => this.handleSuccessfulResponseUser(response),
    
    );

   

  }

  handleSuccessfulResponseUser(response)
  {
      this.users=response;
  }
  
 
  closeDialog(){ 
    this.dialogRef.close({event:'close'}); 
   
  }

  updateAccount(){
      this.contactService.update(this.contact);
      console.log(this.contact);

  }

  passwordShow() {
    this.show = !this.show;
  }

  assignCorporationToManage(selectedValue) {
    console.log(selectedValue)
    console.log("sadadassd")
}
  
  setNewUser(selectedValue: Employee): void {
    console.log(selectedValue.username  + " is choosen user");
    this.choosenUser = selectedValue;
    }


  onSubmitCreate(){
    this.contact.user = this.choosenUser;
    console.log(this.choosenUser + " asdasdas")
    this.contactService.createContact(this.contact).subscribe(
      data => {
        this.contacts.push(this.contact);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    )
  }


onSubmit() {


  
  this.contactService.update(this.contactChoose).subscribe(
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
