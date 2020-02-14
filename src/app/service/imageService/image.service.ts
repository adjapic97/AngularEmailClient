import { Photo } from './../../classes/Photo';
import { Contact } from './../../classes/Contact';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  constructor(private http: HttpClient) {}


  public uploadImage(image: File, contact : Contact){
    const formData = new FormData();

    formData.append('image', image);
  

    return this.http.post('https://localhost:8080/api/profilePics/pic-upload' , formData);
  }


  public uploadImg(formData: FormData, contact: Contact){
    console.log('dasdas' + contact.id)
   return this.http.post('https://localhost:8080/api/pictures/upload/'+ contact.id , formData )
    .subscribe(
                 res => {console.log(res);
                  
                         this.receivedImageData = res;
                         this.base64Data = this.receivedImageData.pic;
                         this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                 err => console.log('Error Occured duringng saving: ' + err.toString())
              );
  }

  public getImages(){
    console.log('Returning images')

    return this.http.get<Photo[]>('https://localhost:8080/api/pictures/getall');
  }


  getPicturesForContact(id){
    return this.http.get<Photo[]>('https://localhost:8080/api/pictures/forContact/' + id);
  }
}
