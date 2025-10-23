import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRatingToMenteeInfoForm } from './session-rating-to-mentee-info-form';

describe('SessionRatingToMenteeInfoForm', () => {
  let component: SessionRatingToMenteeInfoForm;
  let fixture: ComponentFixture<SessionRatingToMenteeInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRatingToMenteeInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRatingToMenteeInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
