import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingCard } from './sliding-card';

describe('SlidingCard', () => {
  let component: SlidingCard;
  let fixture: ComponentFixture<SlidingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
