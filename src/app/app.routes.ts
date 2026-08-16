import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout';
import { Employees } from './pages/employees/employees';
import { Dashboard } from './pages/dashboard/dashboard';
import { Recruitment } from './pages/recruitment/recruitment';
import { AddEmployee } from './pages/add-employee/add-employee';

import { authGuard } from './authguard/auth.guard';
import { Departments } from './pages/departments/departments';
import { Setting } from './pages/setting/setting';


export const routes: Routes = [

    // Login does not use the main Layout..
    {path: 'login', component: Login},

    // Main Application
    {path: '', component: Layout, canActivate: [authGuard],


        children: [

            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: Dashboard },
            {path: 'employees', component: Employees },
            {path: 'add-employee', component: AddEmployee},
            {path: 'edit-employee/:id', component: AddEmployee},
            {path: 'recruitment', component: Recruitment },
            {path: 'department', component: Departments},
            {path: 'settings', component: Setting}
        ]
    },

    // Unknown Url
    {path: '**', redirectTo:'dashboard' }

];
