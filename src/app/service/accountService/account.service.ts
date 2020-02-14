import { Observable, of } from 'rxjs';
import { Account } from './../../classes/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

const ACCOUNT_API = 'https://localhost:8080/api/accounts/updateAccount/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  
getAccounts(page: number){
  return this.http.get<Account[]>('https://localhost:8080/api/accounts?page='+ page + '&size=10');
}


getAccount(id){
  return this.http.get<Account[]>('https://localhost:8080/api/accounts/'+ id);

}

getAccountForUser(id){
  return this.http.get<Account[]>('https://localhost:8080/api/accounts/forUser/' + id);
}



createAccount(newAccount){
  console.log(newAccount.inServerAddress)
  return this.http.post('https://localhost:8080/api/accounts/create',{
    user: newAccount.user,
    smtpAddress: newAccount.smtpAddress,
    inServerType: newAccount.inServerType,
    smtpPort: newAccount.smtpPort,
    inServerAddress: newAccount.inServerAddress,
    inServerPort: newAccount.inServerPort,
    username: newAccount.username,
    password: newAccount.password,
    displayName: newAccount.displayName
  }, httpOptions);
}






update(account): Observable<any> {
  return this.http.put(ACCOUNT_API + account.id, {

    user: account.user,
    smtpAddress: account.smtpAddress,
    inServerType: account.inServerType,
    smtpPort: account.smtpPort,
    inServerAddress: account.inServerAddress,
    inServerPort: account.inServerPort,
    username: account.username,
    password: account.password,
    displayName: account.displayName

  
    
  }, httpOptions);
}


deleteAccount(account): Observable<{}>{
  console.log("deleted https://localhost:8080/api/accounts/delete/"  + account.id);
  return this.http.delete('https://localhost:8080/api/accounts/delete/' + account.id, httpOptions)
  .pipe(
    catchError(this.handleError('deleteMessage'))
  );
}


private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.account}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}

