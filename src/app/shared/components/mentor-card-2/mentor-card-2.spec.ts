import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorCard2 } from './mentor-card-2';

describe('MentorCard2', () => {
  let component: MentorCard2;
  let fixture: ComponentFixture<MentorCard2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorCard2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorCard2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
