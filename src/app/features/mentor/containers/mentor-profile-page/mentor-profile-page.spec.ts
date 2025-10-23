import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProfilePage } from './mentor-profile-page';

describe('MentorProfilePage', () => {
  let component: MentorProfilePage;
  let fixture: ComponentFixture<MentorProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorProfilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
