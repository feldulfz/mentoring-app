import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRatingToMentorInfoForm } from './session-rating-to-mentor-info-form';

describe('SessionRatingToMentorInfoForm', () => {
  let component: SessionRatingToMentorInfoForm;
  let fixture: ComponentFixture<SessionRatingToMentorInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRatingToMentorInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRatingToMentorInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
