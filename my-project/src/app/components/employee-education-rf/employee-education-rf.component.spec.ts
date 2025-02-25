import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationRFComponent } from './employee-education-rf.component';

describe('EmployeeEducationRFComponent', () => {
  let component: EmployeeEducationRFComponent;
  let fixture: ComponentFixture<EmployeeEducationRFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEducationRFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEducationRFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
