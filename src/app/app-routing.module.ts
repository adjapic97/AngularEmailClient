import { ManageusersComponent } from './manageusers/manageusers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { ContactsComponent } from './contacts/contacts.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UseraccountComponent },
 /*  
  { path: 'mod', component: BoardModeratorComponent }, */
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: EmployeeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'manageusers', component: ManageusersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
