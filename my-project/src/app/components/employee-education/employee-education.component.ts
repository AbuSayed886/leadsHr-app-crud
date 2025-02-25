import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-employee-education',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-education.component.html',
  styleUrl: './employee-education.component.css',
  providers:[LocalStorageService]
})
export class EmployeeEducationComponent implements OnInit{

  employeeEducationInfo: any ={
    degree: '',
    groupMajor: '',
    passingYear: '',
    boardName: '',
    rollNo: '',
    registrationNo: '',
    instituteName: '',
    scaleOfGPA: '',
    gradeDivision: '',
    obtainedCGPA: '',
  };
  
  employeeEducationList: any [] = [];
  editIndex: number | null = null;
  editMode: boolean = false;
  showList: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }
  
  addEmployee(){
    if(this.editMode){
      this.updateEmployee();
      return;
    }
    
    this.employeeEducationList.push(structuredClone(this.employeeEducationInfo ));
    this.localStorageService.saveData('employeesEducation', this.employeeEducationList);
    this.clearForm();
    this.showList = true;
  }
  clearForm() {
    this.employeeEducationInfo = {
    degree: '',
    groupMajor: '',
    passingYear: '',
    boardName: '',
    rollNo: '',
    registrationNo: '',
    instituteName: '',
    scaleOfGPA: '',
    gradeDivision: '',
    obtainedCGPA: '',
    };
  }
  ngOnInit(): void {  
    this.employeeEducationList = this.localStorageService.getData('employeesEducation') || [];
  }

  removeEmployee(index: number) {
    this.employeeEducationList.splice(index, 1);
    this.localStorageService.saveData('employeesEducation', this.employeeEducationList);
  }

  editEmployee(index: number) {
    this.employeeEducationInfo = this.employeeEducationList[index];
    this.editIndex = index;
  }

  clearAllEmployees() {
    const isConfirmed = window.confirm("Are you sure ? Its will delete all data from array!")

    if(isConfirmed)
    this.localStorageService.removeData('employeesEducation');
    this.employeeEducationList = [];
  }

  showEmployees(){
    // this shows on console in arry
    console.log('employeesEducation',this.employeeEducationList);
}

  updateEmployee(){
    if(this.editIndex !== null)
    {
      this.employeeEducationInfo[this.editIndex] = structuredClone(this.employeeEducationList);
      this.editIndex = null;

      this.localStorageService.saveData('employeesEducation',this.employeeEducationList);
    }
    
  }

}
