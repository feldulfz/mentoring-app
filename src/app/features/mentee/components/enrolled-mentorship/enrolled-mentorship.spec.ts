import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledMentorship } from './enrolled-mentorship';

describe('EnrolledMentorship', () => {
  let component: EnrolledMentorship;
  let fixture: ComponentFixture<EnrolledMentorship>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledMentorship]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledMentorship);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
