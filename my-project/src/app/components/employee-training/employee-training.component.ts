import { Component ,OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-training',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-training.component.html',
  styleUrl: './employee-training.component.css',
  providers:[LocalStorageService]
})
export class EmployeeTrainingComponent implements OnInit {

  employeeTrainingList: any[] = []; 
  showList: boolean = false;
  editIndex: number | null = null;

  employeeTrainingInfo: FormGroup = new FormGroup(
    {
      topic: new FormControl(""),
      area: new FormControl(""),
      country: new FormControl(""),
      duration: new FormControl(""),
      trainingCost: new FormControl(""),
      arrangeOrganization: new FormControl(""),
      venue: new FormControl(""),
      city: new FormControl(""),
      year: new FormControl(""),
      costBearar: new FormControl("")
    }
  )

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.employeeTrainingList = this.localStorageService.getData('employeesTraining') || [];
  }

  addEmployee(){
    
    const employeeTrainingList = {...this.employeeTrainingInfo.value};
    //debugger;
    
    this.employeeTrainingList.push(structuredClone(this.employeeTrainingInfo.value));
    this.localStorageService.saveData('employeesTraining', this.employeeTrainingList);
    //debugger;
    
    this.clearForm();
    this.showList = true;
  }
  
  clearForm() {
    this.employeeTrainingInfo.reset(); 
  }
  showEmployees(){
    // this shows on console in arry
    console.log('employeesTraining',this.employeeTrainingList);
    //debugger;
  }
  removeEmployee(index: number) {
    this.employeeTrainingList.splice(index, 1);
    this.localStorageService.saveData('employeesTraining', this.employeeTrainingList);
  }

  editEmployee(index: number) {
    this.employeeTrainingInfo = this.employeeTrainingList[index];
    this.editIndex = index;
  }
  clearAllEmployees() {
    const isConfirmed = window.confirm("Are you sure ? Its will delete all data from array!")

    if(isConfirmed)
    this.localStorageService.removeData('employeesTraining');
    this.employeeTrainingList = [];
  }

}
