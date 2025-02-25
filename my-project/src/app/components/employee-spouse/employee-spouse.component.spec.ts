import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSpouseComponent } from './employee-spouse.component';

describe('EmployeeSpouseComponent', () => {
  let component: EmployeeSpouseComponent;
  let fixture: ComponentFixture<EmployeeSpouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSpouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSpouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
