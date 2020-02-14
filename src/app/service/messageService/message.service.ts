import { Account } from './../../classes/Account';
import { PageMessage } from './../../classes/PageMessage';
import { Message } from './../../classes/Message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private  MESS_URL = 'https://localhost:8080/api/messages';
  private  MESS_URL_PAGE = 'https://localhost:8080/api/messages?page=';
  getMessage():Observable<Message[]>{

    return this.http.get<Message[]>(this.MESS_URL).pipe(
      catchError(this.handleError('getMessage', []))
    );
  }




  getPageMessage(page:number): Observable<PageMessage>{
    var url = this.MESS_URL_PAGE;
    url = url + page + "&size=10";
    return this.http.get<PageMessage>(url)
    .pipe(
      map(response => {
        
        const data = response;
        console.log(data);
        console.log('test');
        
        return data ;
      }));
  }


  getMessageById(id){
    return this.http.get<Message[]>('https://localhost:8080/api/messages/'+ id);
  
  }

getMessages(){
  return this.http.get<Message[]>('https://localhost:8080/api/messages?page=0&size=20')
}


getMessagesForLoggedUser(){
  //Dobaviti sve poruke za sve akaunte koji imaju id ulogovanog korisnika
}


getMessagesForAccount(accountId){
  return this.http.get<Message[]>('https://localhost:8080/api/messages/forAccount/' + accountId);
}

///delete metoda nije u redu

deleteMessage(message): Observable<{}>{
  console.log("deleted https://localhost:8080/api/messages/delete/"  + message.id);
  return this.http.delete('https://localhost:8080/api/ /delete/' + message.id, httpOptions)
  .pipe(
    catchError(this.handleError('deleteMessage'))
  );
}


recieveMessages(account){
  return this.http.post<Account>('https://localhost:8080/api/messages/recieveEmails', account, httpOptions)
}
  

  constructor(private http : HttpClient) { }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
