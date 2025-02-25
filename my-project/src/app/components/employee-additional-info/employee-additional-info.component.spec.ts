import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdditionalInfoComponent } from './employee-additional-info.component';

describe('EmployeeAdditionalInfoComponent', () => {
  let component: EmployeeAdditionalInfoComponent;
  let fixture: ComponentFixture<EmployeeAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAdditionalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
