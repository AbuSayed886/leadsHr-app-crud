import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-education-v2',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './employee-education-v2.component.html',
  styleUrl: './employee-education-v2.component.css',
  providers:[LocalStorageService]
})
export class EmployeeEducationV2Component implements OnInit {

  employeeEducationList: any[] = [];
  employeeInfoList: any[] = [];
  designationList: any[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  editIndex: number | null = null;
  editMode: boolean = false;
  editModeEdu: boolean = false;
  editModeInfoEdu: boolean = false;
  showEducationList: boolean = false;
  showFullList: boolean = false;
  showEmployeeList: boolean = false;

  employeeEducationInfo: FormGroup = new FormGroup({
    degree: new FormControl("",Validators.required),
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

  employeeInfo: FormGroup = new FormGroup({
    emplId: new FormControl("",[Validators.required,
      Validators.pattern("^[0-9]+$")]),
    employeeName: new FormControl("",Validators.required),
    employeeDesignation: new FormControl("",Validators.required),
    dateOfBirth: new FormControl("",Validators.required),
    age: new FormControl({ value: "", disabled: true }),
    phoneNumber: new FormControl("",[Validators.required, Validators.pattern(/^(?:\+?88)?01[1-9]\d{8}$/)]),
    gender: new FormControl(""),
    photo: new FormControl(''),
    educationList: new FormControl([])
  })

  constructor(private localStorageService: LocalStorageService,  private router: Router) { }
  
  
  ngOnInit(): void {  
    
    const state = history.state; // Get data passed from navigation
    console.log("Received state:", state);

    if (state && state.employee) {
      this.editIndex = state.index;
      this.patchEmployeeData(state.employee);
      //this.editMode = true;
      //this.showEducationList = true;
      //this.editModeEdu = true;
      this.editModeInfoEdu = true;
    }

    else {
      console.warn("No employee data received!"); // Debugging line
      
    }

    this.employeeInfoList = this.localStorageService.getData('employeeswithInfo') || [];
    this.designationList = this.localStorageService.getData('employeesDesignation') || [];
    
  }
  
  patchEmployeeData(employee: any) {
    if (!employee) return;

    this.employeeInfo.patchValue(employee);
    this.selectedImage = employee.photo || null;
    this.employeeEducationList = employee.educationList ? [...employee.educationList] : [];
    this.editMode = true;
  }

  
  
  // Add education to temporary list
  addEducation() {
    
    if (this.employeeEducationInfo.invalid) {
      alert("Please fill in all required fields correctly before adding education!");
      //this.employeeEducationInfo.markAllAsTouched(); // Highlights invalid fields
      return;
    }

    this.employeeEducationList.push({ ...this.employeeEducationInfo.value });
    this.showEducationList = true;
    this.employeeEducationInfo.reset();
  }

  // Save employee along with education list
  saveEmployee() {
    //validation
    const employeeId = this.employeeInfo.value.emplId;
    if (!employeeId) {
      alert("Employee ID is required!");
      return;
    }

    if (!this.employeeEducationList.length) {
      alert("Please add at least one education record before saving!");
      return;
    }

    const employeeData = {
      ...this.employeeInfo.value,
      educationList: [...this.employeeEducationList],
      photo: this.selectedImage || '',
    };

    this.employeeInfoList.push(employeeData);
    this.localStorageService.saveData("employeeswithInfo", this.employeeInfoList);

    this.clearAllForms();
  }

  saveEmployeeUpdate() {
    
  
      const employeeId = this.employeeInfo.value.emplId;
    
      if (!employeeId) {
        alert("Employee ID is required!");
        return;
      }
    
      // Find index of existing employee with the same emplId
      const existingIndex = this.employeeInfoList.findIndex(emp => emp.emplId === employeeId);
    
      // Create employee object
      const employeeData = {
        ...this.employeeInfo.value,
        educationList: [...this.employeeEducationList],
        photo: this.selectedImage || (existingIndex !== -1 ? this.employeeInfoList[existingIndex].photo : ""),
      };
    
      if (existingIndex !== -1) {
        // Replace old data with updated data
        this.employeeInfoList[existingIndex] = employeeData;
      } else {
        // If no matching emplId, push new data
        this.employeeInfoList.push(employeeData);
      }
    
      // Save to local storage
      this.localStorageService.saveData("employeeswithInfo", this.employeeInfoList);
    
      this.clearAllForms();
      this.editModeInfoEdu = false;
      this.editMode = false;
      }


  // Remove an employee from the list
  removeEmployee(index: number) {
    this.employeeInfoList.splice(index,1);
    this.localStorageService.saveData('employeeswithInfo', this.employeeInfoList);
  }

  // Edit an employee along with their education details
  editEmployee(index: number) {
    this.editIndex = index;
    const selectedEmployee = this.employeeInfoList[index];

    this.employeeInfo.patchValue(selectedEmployee);
    this.employeeEducationList = [...selectedEmployee.educationList];
    this.selectedImage = selectedEmployee.photo;
    //this.employeeEducationInfo.patchValue(this.employeeEducationList[index]);
    this.editMode = true;
    this.showEducationList = true;
    //this.editModeEdu = true;
    this.editModeInfoEdu = true;
  }

  // Update employee information ITS ONLY FOR EMPLOYEE NOT EDU
  updateEmployee() {
    
    const employeeId = this.employeeInfo.value.emplId;
    
    // Find existing employee index by emplId
    const existingIndex = this.employeeInfoList.findIndex(emp => emp.emplId === employeeId);

    // Create new updated employee object
    const updatedEmployee = {
      ...this.employeeInfo.value,
      educationList: [...this.employeeEducationList],
      photo: this.selectedImage || (existingIndex !== -1 ? this.employeeInfoList[existingIndex].photo : null),
    };

    if (existingIndex !== -1) {
      // Remove old data
      this.employeeInfoList.splice(existingIndex, 1);
    }
    

    // Push new data
    this.employeeInfoList.push(updatedEmployee);

    // Save to local storage
    this.localStorageService.saveData("employeeswithInfo", this.employeeInfoList);

    this.editIndex = null;
    this.editMode = false;
    this.clearAllForms();
  }

  calculateAge() {
    const dobValue = this.employeeInfo.get('dateOfBirth')?.value;
    
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      this.employeeInfo.get('age')?.setValue(age);
    }
  }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
    
  //   if (file) {
  //     if (file.type === 'image/jpeg') { //only JPG
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.selectedImage = e.target.result; //Preview 
  //         this.employeeInfo.patchValue({ photo: e.target.result });
  //       };

  //       reader.readAsDataURL(file);
        
  //       alert("Only JPG files are allowed!");
  //       event.target.value = ""; 
  //     }
  //   }
  // }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (!file) return; // If no file selected, exit function
  
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      event.target.value = ""; // Reset input field
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string; // Store the Base64 image
      this.employeeInfo.patchValue({ photo: this.selectedImage }); // Update form control
    };
    reader.readAsDataURL(file);
  }

  onFullShowList(){
    this.showFullList = true;
    //this.showFullList = false;
  }

  toggleFullListView() {
    this.showFullList = !this.showFullList;
  }

  
  clearAllForms() {
    this.employeeInfo.reset();
    this.employeeEducationInfo.reset();
    this.employeeEducationList = [];
    this.showEmployeeList = false;
    this.selectedImage = null;
  }

    showEmployees(){
    
    console.log('employeeswithInfo',this.employeeInfoList);
  } 

    editEducation(index: number) {
    this.editIndex = index;
    this.employeeEducationInfo.patchValue(this.employeeEducationList[index]);
    this.editModeEdu = true;
  }

  
    updateEducation() {
    if (this.editIndex !== null) {
      this.employeeEducationList[this.editIndex] = { ...this.employeeEducationInfo.value };
      this.editIndex = null;
      this.employeeEducationInfo.reset();
    }
    this.editModeEdu = false;
  }

  
   removeEducation(index: number) {
    this.employeeEducationList.splice(index, 1);
  }

  showEmployeesEdu() {
    this.showEmployeeList = true;
    this.employeeInfoList = this.localStorageService.getData('employeeswithInfo') || [];
  }

}



