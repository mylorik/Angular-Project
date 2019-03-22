import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './../data/employee';
import { EmployeeService } from './../data/employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  getEmployeesSub: any;
  loadingError = false;

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    const loaderElem = document.getElementById('loaderID');

    this.getEmployeesSub = this._employeeService.getEmployees().subscribe(
      res => {
        console.log('HTTP response', res);
        this.employees = res;
        loaderElem.parentNode.removeChild(loaderElem);
      },
      err => {
        console.log('HTTP Error', err);
        this.loadingError = true;
      },
      () => { console.log('HTTP request completed.'); });
  }
  ngOnDestroy() {
    if (this.getEmployeesSub) {
      this.getEmployeesSub.unsubscribe();
    }
  }
}
