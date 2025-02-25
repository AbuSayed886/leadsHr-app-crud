import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationV2Component } from './employee-education-v2.component';

describe('EmployeeEducationV2Component', () => {
  let component: EmployeeEducationV2Component;
  let fixture: ComponentFixture<EmployeeEducationV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEducationV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEducationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
