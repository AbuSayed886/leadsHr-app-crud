import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-employee-c',
  imports: [FormsModule, CommonModule ],
  templateUrl: './employee-c.component.html',
  styleUrl: './employee-c.component.css',
  providers: [LocalStorageService]
})

export class EmployeeCComponent implements OnInit {
  
  userEmployee: any = {
    // fname:'',
    // fathername:'',
    // mothername:'',
    // phonenumber:'',
    // add more properties as needed as projects
    employeeId: '',
    name: '',
    grade: 1,
    address: '',
    mobile: '',
    accountType: 'savings',
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    salary:'',
  };
  // using for test for button to vieww
  showTestData: boolean = false;

  //arry list for store.
  employeeList: any[] = [];
  editIndex: number | null = null;
  // grade for emy and acc and dropdown
  grades = [1,2,3,4,5,6];
  
  addEmployee() {
    // Validate employee ID (must be 4 digits)
    if (!/^\d{4}$/.test(this.userEmployee.employeeId)) {
      alert('Employee ID must be a 4-digit number.');
      return;
    }

    // Check if employee ID is unique
    if (this.employeeList.some((e) => e.employeeId === this.userEmployee.employeeId)) {
      alert('Employee ID must be unique.');
      return;
    }

    this.employeeList.push({ ...this.userEmployee });

    
    this.localStorageService.saveData('employees', this.employeeList);
    this.clearForm();
  }

  constructor(private localStorageService: LocalStorageService) { }

  loadEmployees() {
    this.employeeList = this.localStorageService.getData('employees');
  }

  ngOnInit(): void {  
    this.employeeList = this.localStorageService.getData('employees') || [];
  }

  removeEmployee(index: number) {
    this.employeeList.splice(index, 1);
    this.localStorageService.saveData('employees', this.employeeList);
  }

  editEmployee(index: number) {
    this.userEmployee = this.employeeList[index];
    this.editIndex = index;
  }
  clearForm() {
    this.userEmployee = {
      employeeId: '',
      name: '',
      grade: 1,
      address: '',
      mobile: '',
      accountType: 'savings',
      accountName: '',
      accountNumber: '',
      bankName: '',
      branchName: '',
      salary:'',
    };
  }
  clearAllEmployees() {
    const isConfirmed = window.confirm("Are you sure ? Its will delete all data from array!")

    if(isConfirmed)
    this.localStorageService.removeData('employees');
    this.employeeList = [];
  }

  showEmployees(){
    console.log('employees',this.employeeList);
}

}
