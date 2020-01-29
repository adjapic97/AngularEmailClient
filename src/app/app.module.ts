import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptorProviders } from './../_helpers/auth.interceptor';

import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor.service';
import { ContactsComponent } from './contacts/contacts.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserboardComponent } from './userboard/userboard.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule, 
  MatDialogModule,
  MatInputModule,
  MatButtonModule, } from '@angular/material';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    ContactsComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    UserboardComponent,
    UseraccountComponent,
    ModalComponent,
    CreateAccountModalComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents:[ ModalComponent , CreateAccountModalComponent],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
