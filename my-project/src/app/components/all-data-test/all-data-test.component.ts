import { Component, OnInit } from '@angular/core';
import { EmployeeEducationRFComponent } from '../employee-education-rf/employee-education-rf.component';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
//employeesEducation
@Component({
  selector: 'app-all-data-test',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './all-data-test.component.html',
  styleUrl: './all-data-test.component.css',
  providers:[LocalStorageService]
})
export class AllDataTestComponent implements OnInit {

  employeeList: any [] = [];
  selectedImage: string | ArrayBuffer | null = null;
  selectedPdf : string | null = null;
  selectedPdfName : string | null = null;
  // employeeEducationData: any [] = [];
  // employeeExperienceData: any [] = [];
  editIndex: any | null = null;
  editMode: boolean = false;
  showList: boolean = false;

  employeeForm: FormGroup = new FormGroup({
    emplId: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    employeeName: new FormControl('', Validators.required),
    photo: new FormControl(''),
    pdfFile: new FormControl(''),
  });

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // Load employeePHOTO list from localStorage
    this.employeeList =
      this.localStorageService.getData('employeesPhoto') || [];
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
      this.employeeForm.patchValue({ photo: this.selectedImage });
    };
    reader.readAsDataURL(file);
  }

  onFileSelectedPdf(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPdf = reader.result as string;
      this.selectedPdfName = file.name;
      this.employeeForm.patchValue({ pdfFile: this.selectedPdf, pdfFileName: this.selectedPdfName});
    };
    reader.readAsDataURL(file);

  }

  saveEmployee() {
    if (this.employeeForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const employeeData = {
      ...this.employeeForm.value,
      photo: this.selectedImage || '',
      pdfFile: this.selectedPdf || '',
      pdfFileName: this.selectedPdfName || '',
    };

    if (this.editIndex !== null) {
      this.employeeList[this.editIndex] = employeeData;
    } else {
      this.employeeList.push(employeeData);
    }

    this.localStorageService.saveData('employeesPhoto', this.employeeList);
    this.clearForm();
  }

  editEmployee(index: number) {
    this.editIndex = index;
    const employee = this.employeeList[index];

    this.employeeForm.patchValue(employee);
    this.selectedImage = employee.photo;
    this.selectedPdf = employee.pdfFile;
    this.selectedPdfName = employee.pdfFileName ? `Existing File: ${employee.pdfFileName}` : "No PDF uploaded"; 
    // Show filename

    // if (this.selectedPdf) {
    //   setTimeout(() => this.previewPdf(this.selectedPdf as string), 500);
    // }
    // its show herer auto when i clcick edit it shows pdf in the preview
    //this.selectedPdf = null;
  }

  deleteEmployee(index: number) {
    this.employeeList.splice(index, 1);
    this.localStorageService.saveData('employeesPhoto', this.employeeList);
  }

  previewPdf(pdfBase64: string) {
    const pdfWindow = window.open('');
    pdfWindow?.document.write(
      `<iframe width="100%" height="100%" src="${pdfBase64}"></iframe>`
    );
  }

  clearForm() {
    this.employeeForm.reset();
    this.selectedImage = null;
    this.editIndex = null;
    this.selectedPdf = null;
  }

}
