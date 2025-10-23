import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorCardWide } from './mentor-card-wide';

describe('MentorCardWide', () => {
  let component: MentorCardWide;
  let fixture: ComponentFixture<MentorCardWide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorCardWide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorCardWide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
