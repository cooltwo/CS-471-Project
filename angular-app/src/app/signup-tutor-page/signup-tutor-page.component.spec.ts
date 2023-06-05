import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTutorPageComponent } from './signup-tutor-page.component';

describe('SignupTutorPageComponent', () => {
  let component: SignupTutorPageComponent;
  let fixture: ComponentFixture<SignupTutorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupTutorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupTutorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
