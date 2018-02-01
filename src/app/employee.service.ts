import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getAllEmployees() {
    return this.http.get('http://192.168.0.2:8090/api/v1/employee');
  }

  addNewEmployee(employeeObject: any): Observable<any> {
    return this.http.post('http://192.168.0.2:8090/api/v1/employee', employeeObject).map(
      res => {
        if (res.json().hasOwnProperty('errors') || res.json().hasOwnProperty('message')) {
          return false;
        } else {
          return true;
        }
      }
    );
  }

  findEmployee(empID) {
    return this.http.get('http://192.168.0.2:8090/api/v1/employee/find/' + empID);
  }

  updateEmployee(employeeObject: any): Observable<any> {
    return this.http.put('http://192.168.0.2:8090/api/v1/employee/update/' + employeeObject.empID, employeeObject).map(
      res => {
        if (res.json().hasOwnProperty('errors') || res.json().hasOwnProperty('message')) {
          return false;
        } else {
          return true;
        }
      }
    );
  }

  deleteEmployee(employeeObject: any): Observable<any> {
    return this.http.post('http://192.168.0.2:8090/api/v1/employee/delete/' + employeeObject.empID, {}).map(
      res => {
        if (res.json().hasOwnProperty('errors') || res.json().hasOwnProperty('message')) {
          return false;
        } else {
          return true;
        }
      }
    );
  }
}
