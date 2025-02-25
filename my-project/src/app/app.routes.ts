import { Routes } from '@angular/router';
import { AccountCComponent } from './components/account-c/account-c.component';
import { EmployeeCComponent } from './components/employee-c/employee-c.component';
import { DashboardCComponent } from './components/dashboard-c/dashboard-c.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';
import { EmployeeTrainingComponent } from './components/employee-training/employee-training.component';
import { EmployeeAdditionalInfoComponent } from './components/employee-additional-info/employee-additional-info.component';
import { EmployeeSpouseComponent } from './components/employee-spouse/employee-spouse.component';
import { EmployeeEducationRFComponent } from './components/employee-education-rf/employee-education-rf.component';
import { EmployeeExperienceComponent } from './components/employee-experience/employee-experience.component';
import { AllDataTestComponent } from './components/all-data-test/all-data-test.component';
import { EmployeeDesignationComponent } from './components/employee-designation/employee-designation.component';
import { EmployeeEducationV2Component } from './components/employee-education-v2/employee-education-v2.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';

export const routes: Routes = [
    {
        path:'account-c', 
        component: AccountCComponent
    },

    {
        path:'employee-c', 
        component: EmployeeCComponent
    },

    {
        path:'dashboard-c', 
        component: DashboardCComponent
    },
    {
        path:'app-employee-profile', 
        component: EmployeeProfileComponent
    },
    {
        path:'app-employee-education', 
        component: EmployeeEducationComponent
    },
    {
        path:'app-employee-training', 
        component: EmployeeTrainingComponent
    },
    {
        path:'app-employee-additional-info', 
        component: EmployeeAdditionalInfoComponent
    },
    {
        path:'app-employee-spouse', 
        component: EmployeeSpouseComponent
    },
    {
        path:'app-employee-education-rf', 
        component: EmployeeEducationRFComponent
    },
    {
        path:'app-employee-experience', 
        component: EmployeeExperienceComponent
    },
    {
        path:'app-all-data-test', 
        component: AllDataTestComponent
    },
    {
        path:'app-employee-designation', 
        component: EmployeeDesignationComponent
    },
    {
        path:'app-employee-education-v2', 
        component: EmployeeEducationV2Component
    },
    {
        path:'app-employee-list', 
        component: EmployeeListComponent
    },
    {
        path:'app-employee-report', 
        component: EmployeeReportComponent
    },
    {
        path: '', redirectTo: 'app-employee-list', pathMatch: 'full' 
    },
    
  
];
