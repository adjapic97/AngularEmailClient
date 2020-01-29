import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Employee {
  constructor(
   
    public username: string,
    public firstname: string,
    public lastname: string,
    public password: string,
    
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  

  getEmployees() {
    return this.httpClient.get<Employee[]>('https://localhost:8080/api/users/getall');
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>("https://localhost:8080/api/users" + "/" + employee.id);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>("https://localhost:8080/api/users", employee);
  }
}