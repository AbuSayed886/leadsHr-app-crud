import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AccountCComponent } from '../account-c/account-c.component';
import { EmployeeCComponent } from '../employee-c/employee-c.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { EmployeeTrainingComponent } from "../employee-training/employee-training.component";

@Component({
  selector: 'app-dashboard-c',
  //imports: [EmployeeTrainingComponent],
  templateUrl: './dashboard-c.component.html',
  styleUrl: './dashboard-c.component.css',
  providers: [LocalStorageService],
  
})
export class DashboardCComponent {

  @ViewChild(AccountCComponent) accountComponent!: AccountCComponent;
  @ViewChild(EmployeeCComponent) employeeComponent!: EmployeeCComponent;

  bankName = '';
  balance = 0;
  grades: any[] = [];
  employeeCount = 0;
  totalPayment = 0;

  accountDetails: any[] =[];

  constructor(private localStorageService: LocalStorageService) {}
  

  ngAfterViewInit() {
    // data geting from company account
    this.accountDetails= this.localStorageService.getData('companyAccount');
    // Fetch account details
    this.bankName = this.accountComponent.companyAccount.accountNumber;
    this.balance = this.accountComponent.companyAccount.currentBalance;
    this.grades = this.employeeComponent.grades;

    // Fetch employee details
    this.employeeCount = this.employeeComponent.employeeList.length;
    this.totalPayment = this.employeeComponent.employeeList.reduce((sum, emp) => sum + emp.salary, 0);

  }

}