import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorFeedbackPage } from './mentor-feedback-page';

describe('MentorFeedbackPage', () => {
  let component: MentorFeedbackPage;
  let fixture: ComponentFixture<MentorFeedbackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorFeedbackPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
