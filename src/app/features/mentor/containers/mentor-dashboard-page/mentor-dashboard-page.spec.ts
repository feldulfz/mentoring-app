import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDashboardPage } from './mentor-dashboard-page';

describe('MentorDashboardPage', () => {
  let component: MentorDashboardPage;
  let fixture: ComponentFixture<MentorDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
