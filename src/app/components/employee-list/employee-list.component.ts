// src/app/components/employee-list/employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = { ...employee }; // Clone the employee object
  }

  onDelete(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      this.employeeService.deleteEmployee(employee.id!).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  onEmployeeSaved(): void {
    this.loadEmployees();
    this.selectedEmployee = null;
  }
}
