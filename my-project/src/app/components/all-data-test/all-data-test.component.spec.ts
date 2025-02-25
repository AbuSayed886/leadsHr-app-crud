import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDataTestComponent } from './all-data-test.component';

describe('AllDataTestComponent', () => {
  let component: AllDataTestComponent;
  let fixture: ComponentFixture<AllDataTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDataTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDataTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
