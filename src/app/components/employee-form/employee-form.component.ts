// src/app/components/employee-form/employee-form.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnChanges {
  @Input() selectedEmployee: Employee | null = null;
  @Output() employeeSaved = new EventEmitter<void>();

  employee: Employee = {
    name: '',
    email: '',
    position: ''
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployee'] && this.selectedEmployee) {
      this.employee = { ...this.selectedEmployee };
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.employee.id) {
        this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
          this.employeeSaved.emit();
          form.resetForm();
          this.resetForm();
        });
      } else {
        this.employeeService.addEmployee(this.employee).subscribe(() => {
          this.employeeSaved.emit();
          form.resetForm();
          this.resetForm();
        });
      }
    }
  }

  private resetForm(): void {
    this.employee = {
      name: '',
      email: '',
      position: ''
    };
  }
}
