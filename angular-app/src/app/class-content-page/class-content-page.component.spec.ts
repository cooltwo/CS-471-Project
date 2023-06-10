import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassContentPageComponent } from './class-content-page.component';

describe('ClassContentPageComponent', () => {
  let component: ClassContentPageComponent;
  let fixture: ComponentFixture<ClassContentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassContentPageComponent]
    });
    fixture = TestBed.createComponent(ClassContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
