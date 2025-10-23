import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSchedulePage } from './mentor-schedule-page';

describe('MentorSchedulePage', () => {
  let component: MentorSchedulePage;
  let fixture: ComponentFixture<MentorSchedulePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorSchedulePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
