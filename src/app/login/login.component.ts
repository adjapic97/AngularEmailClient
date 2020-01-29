import { TokenStorageService } from './../service/token-storage.service';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username = '';
  authorities: string[] = [];

  constructor(private authService: AuthenticationService, private tokenStorage: TokenStorageService) { }




  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.authorities = this.tokenStorage.getUser().authorities;
      this.username = user.username;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        const user = this.tokenStorage.getUser();

        this.authorities = this.tokenStorage.getUser().authorities;
        this.username = user.username;
        this.reloadPage();
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }




  
/*   ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
        
      },
      error => {
        this.invalidLogin = true

      }
    )
    );

  }
 */
}