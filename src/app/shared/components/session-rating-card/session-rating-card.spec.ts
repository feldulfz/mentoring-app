import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRatingCard } from './session-rating-card';

describe('SessionRatingCard', () => {
  let component: SessionRatingCard;
  let fixture: ComponentFixture<SessionRatingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRatingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRatingCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
