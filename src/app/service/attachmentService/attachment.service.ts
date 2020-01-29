import { Attachment } from './../../classes/Attachment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private ATT_URL = 'https://localhost:8080/api/attachments';

  constructor(private httpClient : HttpClient) { }




  getAttachmentsForMessage(messId : number){
    return this.httpClient.get<Attachment[]>(this.ATT_URL + '/byMessage/' + messId); 

  }
}
