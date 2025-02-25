import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-education-rf',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-education-rf.component.html',
  styleUrl: './employee-education-rf.component.css',
  providers:[LocalStorageService]
})
export class EmployeeEducationRFComponent implements OnInit{

  employeeEducationList: any [] = [];
  editIndex: any | null = null;
  editMode: boolean = false;
  showList: boolean = false;

  employeeEducationInfo: FormGroup = new FormGroup({
    degree: new FormControl(""),
    groupMajor: new FormControl(""),
    passingYear: new FormControl(""),
    boardName: new FormControl(""),
    rollNo: new FormControl(""),
    registrationNo: new FormControl(""),
    instituteName: new FormControl(""),
    scaleOfGPA: new FormControl(""),
    gradeDivision: new FormControl(""),
    obtainedCGPA: new FormControl(""),
  })

  constructor(private localStorageService: LocalStorageService) { }
  
  
  ngOnInit(): void {  
    this.employeeEducationList = this.localStorageService.getData('employeesEducation') || [];
  }

  addEmployee(){
    // if(this.editMode){
    //   this.updateEmployee();
    //   return;
    // }
    const employeeEducationList = {...this.employeeEducationInfo.value};
    
    this.employeeEducationList.push(structuredClone(this.employeeEducationInfo.value )) ;
    this.localStorageService.saveData('employeesEducation', this.employeeEducationList);
    this.clearForm();
    this.showList = true;
  }

  clearForm() {
    this.employeeEducationInfo.reset(); 
  }


  removeEmployee(index: number) {
    this.employeeEducationList.splice(index, 1);
    this.localStorageService.saveData('employeesEducation', this.employeeEducationList);
  }

  // editEmployee(index: number) {
  //   this.employeeEducationInfo = this.employeeEducationList[index];
  //   this.editIndex = index;
  // }
  editEmployee(index: number) {
    this.editIndex = index;
    this.employeeEducationInfo.patchValue(this.employeeEducationList[index]);
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
      // this.employeeEducationInfo[this.editIndex] = structuredClone(this.employeeEducationList);
      this.employeeEducationList[this.editIndex] = { ...this.employeeEducationInfo.value };
      this.editIndex = null;

      this.localStorageService.saveData('employeesEducation',this.employeeEducationList);
    }
    
  }
}




