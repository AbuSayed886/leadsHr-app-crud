import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCComponent } from './account-c.component';

describe('AccountCComponent', () => {
  let component: AccountCComponent;
  let fixture: ComponentFixture<AccountCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
