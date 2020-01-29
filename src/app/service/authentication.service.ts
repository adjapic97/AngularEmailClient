import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password
    }, httpOptions);
  }
}


/*   authenticate(username, password) {
    return this.httpClient.post<any>('https://localhost:8080/api/auth/signin',{username,password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )

    );
  }

  register(user): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signup', {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password
    }, httpOptions);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    if(user == undefined){
      console.log("There is no logged user")
    }else
    
     // console.log(JSON.parse(localStorage.getItem('token')).token)
    console.log(sessionStorage.token)
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
} */