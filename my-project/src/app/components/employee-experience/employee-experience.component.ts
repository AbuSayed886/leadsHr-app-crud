import { Component ,OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-experience',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-experience.component.html',
  styleUrl: './employee-experience.component.css',
  providers:[LocalStorageService]
})
export class EmployeeExperienceComponent implements OnInit{

  employeeExperienceList: any[] = []; 
  showList: boolean = false;
  editIndex: number | null = null;

  employeeExperienceInfo: FormGroup = new FormGroup(
    {
      organization: new FormControl(""),
      joiningDate: new FormControl(""),
      lastWorkingDate: new FormControl(""),
      joiningDesignation: new FormControl(""),
      reportTo: new FormControl(""),
      lastDesignation: new FormControl(""),
      lastReportTo: new FormControl(""),
      effectiveDate: new FormControl(""),
      jobTitle: new FormControl(""),
      salary: new FormControl(""),
      totalNumberofEmployees: new FormControl(""),
      headofTheDeptDiv: new FormControl(""),
      designationDept: new FormControl(""),
      mobileDept: new FormControl(""),
      headofTheHR: new FormControl(""),
      designationHR: new FormControl(""),
      mobileHR: new FormControl(""),
      responsibilities: new FormControl(""),
      significantAchievements: new FormControl(""),
      otherBenefits: new FormControl(""),
    }
  )
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.employeeExperienceList = this.localStorageService.getData('employeesExperience') || [];
  }

  addEmployee(){
    
    const employeeExperienceList = {...this.employeeExperienceInfo.value};
    //debugger;
    
    this.employeeExperienceList.push(structuredClone(this.employeeExperienceInfo.value));
    this.localStorageService.saveData('employeesExperience', this.employeeExperienceList);
    //debugger;
    
    this.clearForm();
    this.showList = true;
  }

  clearForm() {
    this.employeeExperienceInfo.reset(); 
  }

  showEmployees(){
    // this shows on console in arry
    console.log('employeesExperience',this.employeeExperienceList);
    //debugger;
  }
  removeEmployee(index: number) {
    this.employeeExperienceList.splice(index, 1);
    this.localStorageService.saveData('employeesExperience', this.employeeExperienceList);
  }

  editEmployee(index: number) {
    this.employeeExperienceInfo = this.employeeExperienceList[index];
    this.editIndex = index;
  }
  clearAllEmployees() {
    const isConfirmed = window.confirm("Are you sure ? Its will delete all data from array!")

    if(isConfirmed)
    this.localStorageService.removeData('employeesExperience');
    this.employeeExperienceList = [];
  }
}
