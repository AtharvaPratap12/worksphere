import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { NotificationService } from './notification';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {

    private readonly storageKey = 'employees';
    
    private employees: Employee[] = [];

    constructor(
        private notificationService: NotificationService
    ) {
        this.loadEmployees();
    }

    private loadEmployees(): void {

        const storedEmployees = localStorage.getItem(this.storageKey);

        if (storedEmployees) {

            this.employees = JSON.parse(storedEmployees)
        } else {

            this.employees = [
        
                {
                    id: 1,
                    name: 'Atharva Pratap',
                    email: 'atharva.pratap@example.com',
                    phone: '123458978',
                    department: 'Development',
                    position: 'Software Engineer',
                    joiningDate: '2022-01-15',
                    status: 'Active'
                },
                {
                    id: 2,
                    name: 'Sayog Borade',
                    email: 'sayog.borade@example.com',
                    phone: '541524458',
                    department: 'Design',
                    position: 'UI/UX Designer',
                    joiningDate: '2022-01-15',
                    status: 'On Leave'
                },
                {
                    id: 3,
                    name: 'Prathamesh Gade',
                    email: 'prathamesh.gade@example.com',
                    phone: '987654321',
                    department: 'Development',
                    position: 'Backend Developer',
                    joiningDate: '2022-01-15',
                    status: 'Inactive'
                },
                {
                    id: 4,
                    name: 'Priya Paatil',
                    email: 'priya.paatil@example.com',
                    phone: '123458978',
                    department: 'Human Resources',
                    position: 'HR Executive',
                    joiningDate: '2025-11-10',
                    status: 'Active'
                },
                {
                    id: 5,
                    name: 'Sneha Joshi',
                    email: 'sneha.joshi@example.com',
                    phone: '123458978',
                    department: 'Marketing',
                    position: 'Marketing Executive',
                    joiningDate: '2026-02-05',
                    status: 'Active'
                }     
            ];

            this.saveEmployees();
        }
    }

    private saveEmployees(): void {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.employees)
        );
    }

    getEmployees(): Employee[] {

        return this.employees;

    }

    getEmployeeById(
        id: number
    ): Employee | undefined {

        return this.employees.find(
            employee => employee.id === id
        );
    }

    addEmployee(
        employee: Employee
    ): void {

        this.employees.push(employee);
        this.saveEmployees();

        this.notificationService.addNotification(
            'New Employee Added',
            `${employee.name} was added to ${employee.department}`,
            'employee'

        );
    }

    updateEmployee(
        updatedEmployee: Employee
    ): void {
        const index = 
        this.employees.findIndex(
            employee => 
                employee.id === updatedEmployee.id
        );


        if(index >= 0){

            this.employees[index] = updatedEmployee;
            this.saveEmployees();

            this.notificationService.addNotification(
                'Employee Updated',
                `${updatedEmployee.name}'s infromation was updated.`,
                'info'
            );
        }

    }

    deleteEmployee(
        id:number
    ): void {

        const employee = this.employees.find(item  => item.id === id);

        this.employees = this.employees.filter(employee => employee.id !== id);

        this.saveEmployees();

        if (employee) {
            this.notificationService.addNotification(
                'Employee was removed',
                `${employee.name } was removed from the employee list.`,
                'info'
            );
        }
    }
}

    
