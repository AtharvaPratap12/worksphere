import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';

interface DepartmentStats {
  name: string;
  total: number;
  active: number;
  onLeave: number;
  inactive: number;
}

@Component({
  selector: 'app-departments',
  imports: [],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments implements OnInit {

  departmentStats: DepartmentStats[] = [];

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadDepartmentStats();
  }

  loadDepartmentStats(): void {

    const employees = this.employeeService.getEmployees();

    const departmentNames = [
      ...new Set(
        employees.map(employee => employee.department)
      )
    ];

    this.departmentStats = departmentNames.map(department => {

      const departmentEmployees = employees.filter(employee => employee.department === department);

      return {
        name: department,

        total: departmentEmployees.length,

        active: departmentEmployees.filter(
          employee => employee.status === 'Active'
        ).length,

        onLeave: departmentEmployees.filter(
          employee => employee.status === 'On Leave'
        ).length,

        inactive: departmentEmployees.filter(
          employee => employee.status === 'Inactive'
        ).length
      };
    });
  }


}
