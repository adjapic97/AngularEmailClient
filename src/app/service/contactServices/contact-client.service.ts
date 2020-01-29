import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/classes/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactClientService {


  constructor(
    private httpClient: HttpClient
  ) {
  }

  getContacts() {
    return this.httpClient.get<Contact[]>('https://localhost:8080/api/contacts/getall');
  }

  public deleteContact(contact) {
    return this.httpClient.delete<Contact>("https://localhost:8080/api/contacts" + "/" + contact.empId);
  }

  public createContact(contact) {
    return this.httpClient.post<Contact>("https://localhost:8080/api/contacts", contact);
  }
}
