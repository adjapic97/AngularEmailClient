import { SearchService } from './../service/searchService/search.service';
import { searchParams } from './../classes/searchParams';
import { Contact } from 'src/app/classes/contact';
import { PreviewPicturesComponent } from './../preview-pictures/preview-pictures.component';
import { ImageService } from './../service/imageService/image.service';
import { Photo } from './../classes/Photo';
import { UploadPictureModalComponent } from './../upload-picture-modal/upload-picture-modal.component';
import { DeleteContactModalComponent } from './../delete-contact-modal/delete-contact-modal.component';
import { ContactClientService } from './../service/contactServices/contact-client.service';
import { CreateContactModalComponent } from './../create-contact-modal/create-contact-modal.component';
import { UserService } from './../service/userServices/user.service';
import { TokenStorageService } from './../service/token-storage.service';
import { AccountService } from './../service/accountService/account.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService, Employee } from './../service/httpclient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {

  private authorities: string[];
  content = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  contacts: Contact[];
  contact: Contact[];
  andor : boolean;
  byFirstName: boolean;
  byemail: boolean;
  isnormalSearch: boolean;
  fuzzysearch: boolean;
  booleanSearch: boolean;
  newAccount: any = {};
  dialogValue:string; 
  sendValue:string;
  users : Employee[];
  hasProfilePicture: boolean;
  pictures: Photo[];
  imgUrl: any;
  searchparams: searchParams = new searchParams();
  imageBlobUrl: string;
  noImagesFound: boolean;
  url: any;
  phraseSlop: boolean;
  fuzzyMaxEdits: boolean

  constructor(private userService: UserService, 
    private tokenService: TokenStorageService,
    private accountService : AccountService,
    public dialog : MatDialog,
    private httpClientService : HttpClientService,
    private contactService : ContactClientService,
    private imageService: ImageService,
    private searchService : SearchService
    ) { 
      this.andor =false;
      this.byFirstName = false;
      this.isnormalSearch = false;
      this.byemail = false;
      this.fuzzysearch = false;
      this.booleanSearch = false;
      this.hasProfilePicture = false;
      this.noImagesFound = true;
      this.phraseSlop = false;
      this.fuzzyMaxEdits = false;
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


    this.contactService.getContacts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

 

    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;

      }
    );


}


handleSuccessfulResponsePictures(response){
  this.pictures = response;
  
}



handleSuccessfulResponse(response)
{
    this.contacts=response;
}


handleSuccessfulResponseUser(response)
{
    this.users=response;
}


andOr(): void{
  this.andor = !this.andor;
  this.byFirstName = false;
  this.isnormalSearch = false;
  this.searchparams.searchType = 'boolean';
  if(this.andor == false){
    console.log("andor search closed");
  }
  else{
    console.log("andor search opened");
  }
  
}
//izbrisati
/* searchByFirstName(): void{
  this.byFirstName = !this.byFirstName;
  this.andor = false;
  this.isnormalSearch = false;
  this.byemail = false;
  this.booleanSearch = false;
  this.fuzzysearch = false;
} */


normalSearch(): void{
  this.isnormalSearch = !this.isnormalSearch;
  this.andor = false;
  this.byFirstName = false;
  this.byemail = false;
  this.booleanSearch = false;
  this.fuzzysearch = false;
  this.searchparams.searchType = 'normal';
}


openDialog(contact): void {
  const dialogRef = this.dialog.open(CreateContactModalComponent, {
    width: '550px',
    backdropClass:'custom-dialog-backdrop-class',
    panelClass:'custom-dialog-panel-class',
    data: {pageValue: this.sendValue, contact: contact, update : true, create : false}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    //this.dialogValue = result.data;
  });
}


openCreateDialog(): void {
  const createDialogRef = this.dialog.open(CreateContactModalComponent, {
    width: '550px',
    backdropClass:'custom-dialog-backdrop-class',
    panelClass:'custom-dialog-panel-class',
    data: {contacts : this.contacts, create : true, update: false}
  });

  createDialogRef.afterClosed().subscribe(result => {
   
    
      console.log('The dialog was closed');
         
    //this.dialogValue = result.data;
  });


}


createImageFromBlob(image: Blob) {
  var debug = {img: image};
  var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () =>{
    this.imgUrl = reader.result;
  }
/*   reader.addEventListener("load", () => {
    this.imageBlobUrl = reader.result as string;
  }, false);
  if (blob) {
    reader.readAsDataURL(blob);
  }
 */

 // let reader = new FileReader();
 // reader.readAsDataURL(event.target.files[0]);
 // reader.onload = (event2) => {
 //   this.imgURL = reader.result;
}

/* 
crImgFromBlob(image: Blob){
  var debug = {img: image};
  var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
  var reader = new FileReader();
 reader.readAsDataURL(blob); 
 reader.onloadend = function() {
     this.imageBlobUrl= reader.result;                
     console.log(base64data);
 }
}
 */


/* SETTING PARAMETERS FOR SEARCH */
setSearchTarget1(event: any): void{
    this.searchparams.searchTarget1 = event.target.value
    console.log(this.searchparams.searchTarget1)
}

setSearchTarget2(event: any): void{
  this.searchparams.searchTarget2 = event.target.value
  console.log(this.searchparams.searchTarget2)
}


setBooleanOperation(event: any): void {
  this.searchparams.booleanOperation = event.target.value;
  console.log(this.searchparams.booleanOperation)

}


setSearchType(event: any): void{
  this.searchparams.searchType = event.target.value;
  console.log(this.searchparams.searchType)
  if(this.searchparams.searchType = "Phrase"){
      this.phraseSlop = !this.phraseSlop;
  }
}






onSubmitSearch(){
  
  if(this.searchparams.searchParam1 === undefined){
    this.searchparams.searchParam1 = ''
  }
  if(this.searchparams.searchParam2 === undefined){
    this.searchparams.searchParam2 === ''
  }
  if(this.searchparams.booleanOperation === undefined){
    this.searchparams.booleanOperation = ''
  }
  if(this.searchparams.fuzzyPhraseParam === undefined){
    this.searchparams.fuzzyPhraseParam = 1
  }
  if(this.searchparams.searchTarget1 === undefined){
    this.searchparams.searchTarget1 = 'firstname'
  }
  if(this.searchparams.searchTarget2 === undefined){
    this.searchparams.searchTarget2 = ''
  }

  console.log('search by: ' + this.searchparams.searchTarget1
   + " /for parameter value: " 
   + this.searchparams.searchParam1 
   + " / with type of search: " 
   + this.searchparams.searchType
   + '/ slop number: ' 
   + this.searchparams.fuzzyPhraseParam
  )
}



onSubmitSearchAndOr(){


  if(this.searchparams.booleanOperation === undefined){
    this.searchparams.booleanOperation = 'or'
  }
  if(this.searchparams.fuzzyPhraseParam === undefined){
    this.searchparams.fuzzyPhraseParam = 1
  }
  if(this.searchparams.searchTarget1 === undefined){
    this.searchparams.searchTarget1 = 'firstname'
  }
  if(this.searchparams.searchTarget2 === undefined){
    this.searchparams.searchTarget2 = 'lastname'
  }

  if(this.searchparams.searchParam1 === undefined){
    this.searchparams.searchParam1 = ''
  }
  if(this.searchparams.searchParam2 === undefined){
    this.searchparams.searchParam2 = ''
  }
  
  

  console.log('andOr Search');
  console.log('search type: ' + this.searchparams.searchType)
  console.log(this.searchparams.booleanOperation)
  console.log(this.searchparams.fuzzyPhraseParam)
  console.log(this.searchparams.searchParam1)
  console.log(this.searchparams.searchParam2)
  console.log(this.searchparams.searchTarget1)
  console.log(this.searchparams.searchTarget2)


  this.searchService.returnResultsForSearchedContact(
    this.searchparams.searchType,
    this.searchparams.searchParam1,
    this.searchparams.searchParam2,
    this.searchparams.searchTarget1,
    this.searchparams.searchTarget2,
    this.searchparams.booleanOperation,
    this.searchparams.fuzzyPhraseParam
  ).subscribe(
    response => this.handleSuccessfulResponse(response),
  );
}


openImagePreviewModal(contact){
  console.log(contact.id)
  this.imageService.getPicturesForContact(contact.id).subscribe(
    response => this.handleSuccessfulResponsePictures(response),
  ); 



  if(this.pictures != null){
    this.noImagesFound = false;
    this.createImageFromBlob(this.pictures[1].pic)
    
    var objectURL = URL.createObjectURL(this.imgUrl);
  
  }
  else{
    this.noImagesFound = true;
  }
  
 // this.url = window.URL.createObjectURL(this.pictures[0].pic);
  const previewDialogRef = this.dialog.open(PreviewPicturesComponent,{
    width: '1000px',
    backdropClass:'custom-dialog-backdrop-class',
    panelClass: 'custom-dialog-container',
    data: { pictures : this.pictures, imgUrl : objectURL, noImagesFound : this.noImagesFound}
  })
  console.log("Preview images for clicked Contact Modal.")
 




}






deleteContactModal(contact){
  const deleteDialogRef = this.dialog.open(DeleteContactModalComponent, {
    width: '350px',
    backdropClass:'custom-dialog-backdrop-class',
    panelClass:'custom-dialog-panel-class',
    data: {contactToDelete : contact, contacts: this.contacts}
    
  })
  console.log("delete this Contact: " + contact.username)
}


uploadPictureModal(contact){
  const uploadDialogRef = this.dialog.open(UploadPictureModalComponent,{
    width: '750px',
    height: '800px',
    backdropClass:'custom-dialog-backdrop-class',
    panelClass:'custom-dialog-panel-class',
    data: { contact : contact}
  })
  console.log("Upload picture modal")
}




}