import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-spouse',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-spouse.component.html',
  styleUrl: './employee-spouse.component.css',
  providers:[LocalStorageService]
})
export class EmployeeSpouseComponent implements OnInit {

  employeeSpouseList: any[] = [];
  showList: boolean = false;
  editIndex: number | null = null;

  employeeSpouseInfo: FormGroup = new FormGroup({
    sname: new FormControl(""),
    sOccupation: new FormControl(""),
    sSex: new FormControl(""),
    sBloodGroup: new FormControl(""),
    sMobileNo: new FormControl(""),
    sEmail: new FormControl(""),
    sReligion: new FormControl(""),
    sDateofBirth: new FormControl(""),
    sNationality: new FormControl(""),
    sPassportNo: new FormControl(""),
    sPassportIssueDate: new FormControl(""),
    sPassportExpiryDate: new FormControl(""),
    sDualCitizenshipStatus: new FormControl(""),
    sPrStatus: new FormControl(""),
    sMarriageDate: new FormControl(""),
    sPermanentCountry: new FormControl(""),
    sPermanentDivision: new FormControl(""),
    sPermanentDistrict: new FormControl(""),
    sPermanentUpazila: new FormControl(""),
    sPermanentPostCode: new FormControl(""),
    sAddress: new FormControl(""),
  })

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(){
    this.employeeSpouseList = this.localStorageService.getData('employeesSpouse') || [];
  }

  addEmployee(){
    
    const employeeSpouseList = {...this.employeeSpouseInfo.value};
    //debugger;
    
    this.employeeSpouseList.push(structuredClone(this.employeeSpouseInfo.value));
    this.localStorageService.saveData('employeesSpouse', this.employeeSpouseList);
    //debugger;
    
    this.clearForm();
    this.showList = true;
  }

  clearForm() {
    this.employeeSpouseInfo.reset(); 
  }

  showEmployees(){
    // this shows on console in arry
    console.log('employeesTraining',this.employeeSpouseList);
    //debugger;
  }

}
