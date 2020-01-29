import { Observable } from 'rxjs';
import { Account } from './../../classes/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCOUNT_API = 'https://localhost:8080/api/accounts/updateAccount/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  
getAccounts(){
  return this.http.get<Account[]>('https://localhost:8080/api/accounts?page=0&size=10');
}

getAccount(id){
  return this.http.get<Account[]>('https://localhost:8080/api/accounts/'+ id);

}



createAccount(newAccount){
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


}

