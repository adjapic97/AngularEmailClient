import { HttpClient } from '@angular/common/http';
import { Contact } from './../classes/Contact';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { ImageService } from './../service/imageService/image.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-upload-picture-modal',
  templateUrl: './upload-picture-modal.component.html',
  styleUrls: ['./upload-picture-modal.component.css']
})
export class UploadPictureModalComponent implements OnInit {
  
  contact: Contact;
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  constructor(public dialogRef: MatDialogRef<UploadPictureModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private imageService : ImageService,private http : HttpClient) {

      this.contact = data.contact;
      
     }

  ngOnInit() {
  }


  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };

 }


 // This part is for uploading
 onUpload(contact) {


  //console.log('this is being uploaded: ' + this.imgURL)
  const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  console.log(uploadData)
  
  contact = this.contact

  this.imageService.uploadImg(uploadData, contact)
  console.log('KONTAKT: ' + contact.displayname)


 }



}
