import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSidenavLinks } from './mentor-sidenav-links';

describe('MentorSidenavLinks', () => {
  let component: MentorSidenavLinks;
  let fixture: ComponentFixture<MentorSidenavLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorSidenavLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSidenavLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
