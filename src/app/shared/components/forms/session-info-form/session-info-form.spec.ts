import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInfoForm } from './session-info-form';

describe('SessionInfoForm', () => {
  let component: SessionInfoForm;
  let fixture: ComponentFixture<SessionInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
