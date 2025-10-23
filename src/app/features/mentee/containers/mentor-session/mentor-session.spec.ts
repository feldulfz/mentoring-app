import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSession } from './mentor-session';

describe('MentorSession', () => {
  let component: MentorSession;
  let fixture: ComponentFixture<MentorSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
