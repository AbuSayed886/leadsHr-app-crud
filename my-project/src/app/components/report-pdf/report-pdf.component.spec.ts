import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPDFComponent } from './report-pdf.component';

describe('ReportPDFComponent', () => {
  let component: ReportPDFComponent;
  let fixture: ComponentFixture<ReportPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportPDFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
