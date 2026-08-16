import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  totalEmployees = 0;
  activeEmployees = 0;
  departments = 0;
  newHires = 0;

  recentEmployees: Employee[] = [];

  // Department statistics
  departmentStats: {
    name: string;
    count: number;
  }[] = [];

  // Employee status statistics
  statusStats: {
    name: string;
    count: number;
  }[] = [];


  constructor(
    private employeeService: EmployeeService
  ) {}


  ngOnInit(): void {
    this.loadDashboardData();
  }


  loadDashboardData(): void {

    const employees =
      this.employeeService.getEmployees();
      this.recentEmployees = [...employees]
        .sort(
          (a,b) => 
            new Date(b.joiningDate).getTime() - 
            new Date(a.joiningDate).getTime()
        )
        .slice(0,5);


    // =========================
    // TOTAL EMPLOYEES
    // =========================

    this.totalEmployees =
      employees.length;


    // =========================
    // ACTIVE EMPLOYEES
    // =========================

    this.activeEmployees =
      employees.filter(
        employee => employee.status === 'Active'
      ).length;


    // =========================
    // TOTAL DEPARTMENTS
    // =========================

    this.departments =
      new Set(
        employees.map(
          employee => employee.department
        )
      ).size;


    // =========================
    // NEW HIRES
    // =========================

    const currentYear =
      new Date().getFullYear();

    this.newHires =
      employees.filter(
        employee => {

          const joiningYear =
            new Date(
              employee.joiningDate
            ).getFullYear();

          return joiningYear === currentYear;

        }
      ).length;


    // =========================
    // DEPARTMENT STATISTICS
    // =========================

    const departmentMap =
      new Map<string, number>();


    employees.forEach(employee => {

      const currentCount =
        departmentMap.get(
          employee.department
        ) ?? 0;


      departmentMap.set(
        employee.department,
        currentCount + 1
      );

    });


    this.departmentStats =
      Array.from(
        departmentMap.entries()
      ).map(
        ([name, count]) => ({
          name,
          count
        })
      );


    // =========================
    // EMPLOYEE STATUS STATISTICS
    // =========================

    this.statusStats = [

      {
        name: 'Active',
        count: employees.filter(
          employee =>
            employee.status === 'Active'
        ).length
      },

      {
        name: 'On Leave',
        count: employees.filter(
          employee =>
            employee.status === 'On Leave'
        ).length
      },

      {
        name: 'Inactive',
        count: employees.filter(
          employee =>
            employee.status === 'Inactive'
        ).length
      }

    ];

  }

}