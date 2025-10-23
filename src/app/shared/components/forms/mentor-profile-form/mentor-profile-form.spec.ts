import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProfileForm } from './mentor-profile-form';

describe('MentorProfileForm', () => {
  let component: MentorProfileForm;
  let fixture: ComponentFixture<MentorProfileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorProfileForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorProfileForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
