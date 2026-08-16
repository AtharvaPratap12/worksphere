import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';


import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { NotificationService } from '../../services/notification';




@Component({
  selector: 'app-add-employee',
  imports: [ ReactiveFormsModule ],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnInit {

  employeeId: number | null = null;

  isEditMode = false;

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

    this.employeeForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      department: [
        '',
        Validators.required
      ],

      position: [
        '',
        Validators.required
      ],

      joiningDate: [
        '',
        Validators.required
      ],

      status: [
        'Active',
        Validators.required
      ]

    });

  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.employeeId = Number(id);

      this.isEditMode = true;

      this.loadEmployee(this.employeeId);

    }

  }

  loadEmployee(id: number): void {

    const employee =
      this.employeeService.getEmployeeById(id);

    if (!employee) {

      this.router.navigate(['/employees']);

      return;

    }

    this.employeeForm.patchValue({

      name: employee.name,

      email: employee.email,

      phone: employee.phone,

      department: employee.department,

      position: employee.position,

      joiningDate: employee.joiningDate,

      status: employee.status

    });

  }

  submitForm(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const formValue = this.employeeForm.value;

    if (this.isEditMode && this.employeeId !== null) {

      const updatedEmployee: Employee = {

        id: this.employeeId,

        name: formValue.name!,

        email: formValue.email!,

        phone: formValue.phone!,

        department: formValue.department!,

        position: formValue.position!,

        joiningDate: formValue.joiningDate!,

        status: formValue.status as Employee['status']

      };

      this.employeeService.updateEmployee(
        updatedEmployee
      );

      this.notificationService.addNotification(
        'Employee updated',
        `${updatedEmployee.name}'s information was updated.`,
        'success'
      );

    } else {

      const newEmployee: Employee = {

        id: Date.now(),

        name: formValue.name!,

        email: formValue.email!,

        phone: formValue.phone!,

        department: formValue.department!,

        position: formValue.position!,

        joiningDate: formValue.joiningDate!,

        status: formValue.status as Employee['status']

      };

      this.employeeService.addEmployee(
        newEmployee
      );

      this.notificationService.addNotification(
        'New Employee Added',
        `${newEmployee.name} was added to the organization.`,
        'employee'

      );

    }

    this.router.navigate(['/employees']);

  }

  cancel(): void {

    this.router.navigate(['/employees']);

  }

}


