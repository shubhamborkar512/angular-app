import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private serverUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<any>(`${this.serverUrl}/employee/all`);
  }

  public addEmployee(emp:Employee): Observable<Employee>{
    return this.http.post<any>(`${this.serverUrl}/employee/add`,emp);
  }

  public updateEmployee(emp:Employee): Observable<Employee>{
    return this.http.put<any>(`${this.serverUrl}/employee/update`,emp);
  }

  public deleteEmployee(empId:number): Observable<void>{
      return this.http.delete<any>(`${this.serverUrl}/employee/delete/${empId}`);
  }
}
