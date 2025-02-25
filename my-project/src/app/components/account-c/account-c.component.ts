import { Component ,OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-c',
  imports: [FormsModule, CommonModule],
  templateUrl: './account-c.component.html',
  styleUrl: './account-c.component.css',
  providers: [LocalStorageService]
})
export class AccountCComponent implements OnInit {
  // Company account balance
  companyAccount = {
    accountNumber: 'COMPANY001',
    currentBalance: 0,
  };

  // Input for adding funds
  addFundsAmount: number = 0;

  // Basic salary for Grade 6
  basicGrade6: number = 0;

  // List of employees (loaded from localStorage)
  employeeList: any[] = [];
  salaryHistory: any[] = [];
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // Load company account balance from localStorage
    const savedBalance = this.localStorageService.getData('companyAccount');
    if (savedBalance) {
      this.companyAccount = savedBalance;
    }

    // Load employee list from localStorage
    this.employeeList = this.localStorageService.getData('employees') || [];
    this.salaryHistory = this.localStorageService.getData('salaryHistory') || [];
  }

  // Add funds to the company account
  addFunds() {
    this.companyAccount.currentBalance += this.addFundsAmount;
    this.addFundsAmount = 0;

    // Save updated balance to localStorage
    this.localStorageService.saveData('companyAccount', this.companyAccount);
  }

  // Calculate salary for an employee
  calculateSalary(employee: any): number {
    const gradeDifference = 6 - employee.grade;
    const basic = this.basicGrade6 + gradeDifference * 5000;
    const houseRent = basic * 0.2;
    const medicalAllowance = basic * 0.15;
    return basic + houseRent + medicalAllowance;
  }

  // Transfer salary to all employees
  transferSalaries() {
    this.employeeList = this.localStorageService.getData('employees') || [];

    let totalSalary = 0;

    let salaryPayments: any[] = [];

    let updatedEmployees: any[] = [];

  this.employeeList.forEach((employee) => {
    const salary = this.calculateSalary(employee);
    totalSalary += salary;

    employee.salary = salary;

    salaryPayments.push({
      employeeId: employee.employeeId,
      name: employee.name,
      salary: salary,
      date: new Date().toLocaleString()
    });
    // added for sallry update // employee banan vul korsi. amar life e 1 h loss
    this.localStorageService.saveData('employees', this.employeeList);
    updatedEmployees.push(employee);
    
  });

  if (this.companyAccount.currentBalance >= totalSalary) {
    this.companyAccount.currentBalance -= totalSalary;
    alert('Salaries transferred successfully!');
    
    // Save updated balance
    this.localStorageService.saveData('companyAccount', this.companyAccount);

    // Save salary payment history
    this.salaryHistory.push(...salaryPayments);
    this.localStorageService.saveData('salaryHistory', this.salaryHistory);
  } else {
    alert('Insufficient balance in the company account.');
  }
  }

  clearBankData() {
    this.companyAccount.currentBalance = 0; // Reset balance
    this.addFundsAmount = 0; // Reset input fields
    this.basicGrade6 = 0;
    
  }

}
