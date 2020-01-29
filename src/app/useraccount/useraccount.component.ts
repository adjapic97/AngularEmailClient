import { HttpClient } from '@angular/common/http';
import { AccountService } from './../service/accountService/account.service';
import { Observable } from 'rxjs';
import { UserService } from './../service/userServices/user.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})
export class UseraccountComponent implements OnInit {

  content: string;

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }


}