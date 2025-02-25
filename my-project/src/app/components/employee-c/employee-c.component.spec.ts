import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCComponent } from './employee-c.component';

describe('EmployeeCComponent', () => {
  let component: EmployeeCComponent;
  let fixture: ComponentFixture<EmployeeCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
