import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-designation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-designation.component.html',
  styleUrl: './employee-designation.component.css',
  providers:[LocalStorageService]
})
export class EmployeeDesignationComponent {

  employeeDesignationList: any [] = [];
  editIndex: any | null = null;
  editMode: boolean = false;
  showList: boolean = false;

  employeeDesignationInfo: FormGroup = new FormGroup({
    dname: new FormControl(""),
    dnameShort: new FormControl(""),
    isActive: new FormControl(""),
  })
  
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {  
    this.employeeDesignationList = this.localStorageService.getData('employeesDesignation') || [];
  }

  addEmployee(){
   
    const employeeEducationList = {...this.employeeDesignationInfo.value};
    
    this.employeeDesignationList.push(structuredClone(this.employeeDesignationInfo.value )) ;
    this.localStorageService.saveData('employeesDesignation', this.employeeDesignationList);
    this.clearForm();
    this.showList = true;
  }

  clearForm() {
    this.employeeDesignationInfo.reset(); 
  }

  editEmployee(index: number) {
    this.editIndex = index;
    this.employeeDesignationInfo.patchValue(this.employeeDesignationList[index]);
    this.editMode = true;

}

updateEmployee(){
  if(this.editIndex !== null)
  {
    
    this.employeeDesignationList[this.editIndex] = { ...this.employeeDesignationInfo.value };
    this.editIndex = null;

    this.localStorageService.saveData('employeesDesignation',this.employeeDesignationList);
    this.editMode = false;
  }
  
}

removeEmployee(index: number) {
  this.employeeDesignationList.splice(index, 1);
  this.localStorageService.saveData('employeesDesignation', this.employeeDesignationList);
}

showEmployees(){
  // this shows on console in arry
  console.log('employeesEducation',this.employeeDesignationList);

}

}

