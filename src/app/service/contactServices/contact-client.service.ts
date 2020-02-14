import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/classes/Contact';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactClientService {


  constructor(
    private httpClient: HttpClient
  ) {
  }

  getContacts() {
    return this.httpClient.get<Contact[]>('https://localhost:8080/api/contacts?page=0&size=10')
  }



  deleteContact(contact): Observable<{}>{
    console.log("deleted https://localhost:8080/api/contacts/delete/"  + contact.id);
    return this.httpClient.delete('https://localhost:8080/api/contacts/delete/' + contact.id, httpOptions)
    .pipe(
      catchError(this.handleError('deleteContact'))
    );
  }



  public createContact(contact) {
    return this.httpClient.post<Contact>("https://localhost:8080/api/contacts/addContact", {
      user: contact.user,
      displayName: contact.displayName,
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      text: contact.text
    }, httpOptions);
  }



  update(contact): Observable<any> {
    console.log('https://localhost:8080/api/contacts/updateContact/' + contact.id)
    return this.httpClient.put('https://localhost:8080/api/contacts/updateContact/' + contact.id, {
      euser: contact.euser,
      displayName: contact.displayName,
      firstname: contact.firstname,
      lastname: contact.lastname,
      text: contact.text,
     
    }, httpOptions);
  }
  


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.contact}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
