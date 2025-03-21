import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExperienceComponent } from './employee-experience.component';

describe('EmployeeExperienceComponent', () => {
  let component: EmployeeExperienceComponent;
  let fixture: ComponentFixture<EmployeeExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
