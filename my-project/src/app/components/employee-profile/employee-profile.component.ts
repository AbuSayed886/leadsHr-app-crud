import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-employee-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css',
  providers: [LocalStorageService]
})
export class EmployeeProfileComponent implements OnInit{

  employeeProfileList: any[] = [];
  showList: boolean = false;
  editIndex: number | null = null;
  organizationalDetailsList: any[] = [];

  employeeProfileInfo: FormGroup = new FormGroup({
  id: new FormControl(''),
  fullNameEng: new FormControl(''),
  fullNameBang: new FormControl(''),
  sex: new FormControl(''),
  fatherNameEng: new FormControl(''),
  fatherNamebang: new FormControl(''),
  mothersNameEng: new FormControl(''),
  mothersNamebang: new FormControl(''),
  birthDate: new FormControl(''),
  palaceOfBirth: new FormControl(''),
  birthCertificateNo: new FormControl(''),
  nationality: new FormControl(''),
  nationalIdNo: new FormControl(''),
  religion: new FormControl(''),
  bloodGroup: new FormControl(''),
  height: new FormControl(''),
  weight: new FormControl(''),
  marriedstatus: new FormControl(''),
  mDate: new FormControl(''),
  divorceddate: new FormControl(''),
  homePhone: new FormControl(''),
  personalMobileNo: new FormControl(''),
  officialMobileNo: new FormControl(''),
  pemail: new FormControl(''),
  offcialemail: new FormControl(''),
  extensionNumber: new FormControl(''),
  passportNo: new FormControl(''),
  placeofIssue: new FormControl(''),
  expiryDate: new FormControl(''),
  drivingLicenseNo: new FormControl(''),
  presentCountry: new FormControl(''),
  presentDivision: new FormControl(''),
  presentDistrict: new FormControl(''),
  presentUpazila: new FormControl(''),
  presentPostCode: new FormControl(''),
  presentAddress: new FormControl(''),
  emergencyContactPerson: new FormControl(''),
  relationwithContactPerson: new FormControl(''),
  emergencyContactNo: new FormControl(''),
  emergencyContactNidNo: new FormControl(''),
  emergencyContactEmail: new FormControl(''),
  emergencyContactCountry: new FormControl(''),
  emergencyContactDivision: new FormControl(''), 
  emergencyContactDistrict: new FormControl(''),
  emergencyContactUpazila: new FormControl(''),
  emergencyContactPostCode: new FormControl(''),
  address: new FormControl(''),
  })

  organizationalDetailsInfo: FormGroup = new FormGroup({
    employmentType: new FormControl(''),
    jobStatus: new FormControl(''),
    corporateDesignation: new FormControl(''),
    functionalDesignation: new FormControl(''),
    reportTo: new FormControl(''),
    joiningDate: new FormControl(''),
    confirmationDate: new FormControl(''),
    jobStatusChangedDate: new FormControl(''),
    basicSalary: new FormControl(''),
    pfNo: new FormControl(''),
    probationPeriod: new FormControl(''),
    expectedConfirmDate: new FormControl(''),
  })

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(){
    this.employeeProfileList = this.localStorageService.getData('employeeProfileInfo') || [];

    this.organizationalDetailsList = this.localStorageService.getData('organizationalDetailsInfo') || [];
  }

  addEmployee(){
    
    // employeeProfile
    const employeeProfileList = {...this.employeeProfileInfo.value};
    this.employeeProfileList.push(structuredClone(this.employeeProfileInfo.value));
    this.localStorageService.saveData('employeeProfileInfo', this.employeeProfileList);
    
    // organazationProfile
    const organizationalDetailsList = {...this.organizationalDetailsInfo.value};
    this.organizationalDetailsList.push(structuredClone(this.organizationalDetailsInfo.value));
    this.localStorageService.saveData('organizationalDetailsInfo', this.organizationalDetailsList);
    
    this.clearForm();
    this.showList = true;
  }
  clearForm() {
    this.employeeProfileInfo.reset(); 
    this.organizationalDetailsInfo.reset(); 
  }

  showEmployees(){
    // this shows on console in arry
    console.log('employeeProfileInfo',this.employeeProfileList);
    console.log('organizationalDetailsInfo',this.organizationalDetailsList);
    //debugger;
  }

}
