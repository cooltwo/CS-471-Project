import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStudentPageComponent } from './signup-student-page.component';

describe('SignupPageComponent', () => {
  let component: SignupStudentPageComponent;
  let fixture: ComponentFixture<SignupStudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupStudentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
