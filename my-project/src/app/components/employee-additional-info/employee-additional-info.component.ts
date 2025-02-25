import { Component ,OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-additional-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-additional-info.component.html',
  styleUrl: './employee-additional-info.component.css',
  providers:[LocalStorageService]
})
export class EmployeeAdditionalInfoComponent implements OnInit{

  employeeAdditionalInfoList: any[] = [];
  showList: boolean = false;
  editIndex: number | null = null;

  employeeAdditionalInfo: FormGroup = new FormGroup({
    facebookIDLink: new FormControl("",Validators.required),
    favoriteColor: new FormControl(""),
    professionalMembershipInformation: new FormControl(""),
    willingnessToDonateBlood: new FormControl(""),
    existingTaxZone: new FormControl(""),
    ethnic: new FormControl(""),
    drivingLicenseIssueDate: new FormControl(""),
    flexCubeUserID: new FormControl(""),
    pcUserID: new FormControl(""),
    foodLiking: new FormControl(""),
    dualCitizenshipStatus: new FormControl(""),
    countryNameDualCitizenship: new FormControl(""),
    countryVisited: new FormControl(""),
    lastMedicalCheckup: new FormControl(""),
    parentsMedicalHistory: new FormControl(""),
    hobby: new FormControl(""),
    linkedInIDLink: new FormControl("",[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
    professionalMembershipDetails: new FormControl(""),
    eTinNo: new FormControl("",[Validators.required, Validators.pattern(/^(?:\+?88)?01[1-9]\d{8}$/)]),
    existingTaxCircle: new FormControl(""),
    drivingLicenseType: new FormControl(""),
    drivingLicensExpiryDate: new FormControl(""),
    flexcubeAuthorizerID: new FormControl(""),
    pcIPAddress: new FormControl(""),
    overallScoreIELTSTOFEL: new FormControl(""),
    prStatus: new FormControl(""),
    dualPassportNumber: new FormControl(""),
    employeeMedicalHistory: new FormControl(""),
    majorOperation: new FormControl(""),
  })

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(){
    this.employeeAdditionalInfoList = this.localStorageService.getData('employeesAdditionalInfo') || [];
  }

  addEmployee(){
    
    const employeeAdditionalInfoList = {...this.employeeAdditionalInfo.value};
    //debugger;
    
    this.employeeAdditionalInfoList.push(structuredClone(this.employeeAdditionalInfo.value));
    this.localStorageService.saveData('employeesAdditionalInfo', this.employeeAdditionalInfoList);
    //debugger;
    
    this.clearForm();
    this.showList = true;
  }
  clearForm() {
    this.employeeAdditionalInfo.reset(); 
  }

  showEmployees(){
    // this shows on console in arry
    console.log('employeesTraining',this.employeeAdditionalInfoList);
    //debugger;
  }

}
