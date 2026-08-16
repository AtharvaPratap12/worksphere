import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification';


@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null

  searchText: string = '';
  selectedDepartment: string = '';

  departments: string[] = [
    'Development',
    'Design',
    'Human Resources',
    'Marketing'
  ];

  constructor(
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  get filteredEmployees(): Employee[] {
  return this.employees.filter(employee => {

    const matchesSearch =
      employee.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchText.toLowerCase());

    const matchesDepartment =
      !this.selectedDepartment ||
      employee.department === this.selectedDepartment;

    return matchesSearch && matchesDepartment;
  });
}

  deleteEmployee(employeeId: number): void {

    const employee = this.employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return;
    }

    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {

      this.employeeService.deleteEmployee(employeeId);

      this.notificationService.addNotification(
        'Employee Deleted',
        `${employee.name} was removed from the organnization.`,
        'info'
      );

      this.employees = this.employeeService.getEmployees();
    }
  }

  viewEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  closeEmployeeDetails(): void {
    this.selectedEmployee = null;
  }
}
