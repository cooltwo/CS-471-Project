import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSchedulerPageComponent } from './session-scheduler-page.component';

describe('SessionSchedulerPageComponent', () => {
  let component: SessionSchedulerPageComponent;
  let fixture: ComponentFixture<SessionSchedulerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionSchedulerPageComponent]
    });
    fixture = TestBed.createComponent(SessionSchedulerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
