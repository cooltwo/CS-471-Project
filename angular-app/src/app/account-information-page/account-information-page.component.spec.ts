import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInformationPageComponent } from './account-information-page.component';

describe('AccountInformationPageComponent', () => {
  let component: AccountInformationPageComponent;
  let fixture: ComponentFixture<AccountInformationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInformationPageComponent]
    });
    fixture = TestBed.createComponent(AccountInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
