import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];

  public editEmployee: Employee;
  public deleteEmployee:Employee;
  constructor(private employeeService:EmployeeService){}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees():void{
    this.employeeService.getAllEmployee().subscribe(
        (response: Employee[])=>{
          this.employees=response;
        },
        (error:HttpErrorResponse)=>{ 
          alert(error.message);
        }
    );
  }

  public openModal(emp:Employee|null,mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode==="add"){
      button.setAttribute('data-bs-target','#AddEmpModal');
    }
    if(mode==="edit"){
      if(emp==null){
        alert;
      }
      else{
        this.editEmployee=emp;
      }
      button.setAttribute('data-bs-target','#EditEmpModal');
    }
    if(mode==="delete"){
      if(emp==null){
        alert;
      }
      else{
        this.deleteEmployee=emp;
      }
      button.setAttribute('data-bs-target','#DeleteEmpModal');
    }
    container?.appendChild(button);
    button.click();
  }


  public onAddEmp(addForm:NgForm):void{
    document.getElementById("addEmpCancel")?.click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response:Employee)=>{
            console.log(response);
            this.getAllEmployees();
          },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }
          
          );
          addForm.reset();
        }

  public onUpdateEmp(emp:Employee):void{
    document.getElementById("EditEmpModal")?.click();
      this.employeeService.updateEmployee(emp).subscribe(
        (response:Employee)=>{
            console.log(response);
            this.getAllEmployees();
          },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }
          
          );
        }
        
      public onDeletEmp(id:number):void{
          document.getElementById("deleteEmpCancel")?.click();
          this.employeeService.deleteEmployee(id).subscribe(
            (response:void)=>{
                console.log(response);
                this.getAllEmployees();
              },
              (error:HttpErrorResponse)=>{
                alert(error.message);
              }
              
              );
          this.getAllEmployees();
      }



      public searchEmployees(key: string): void {
        const results: Employee[] = [];
        for (const employee of this.employees) {
          if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            results.push(employee);
          }
        }
        this.employees = results;
        if (results.length === 0 || !key) {
          this.getAllEmployees();
        }
      }
  }
  