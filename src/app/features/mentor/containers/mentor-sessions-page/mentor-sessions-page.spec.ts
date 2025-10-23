import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSessionsPage } from './mentor-sessions-page';

describe('MentorSessionsPage', () => {
  let component: MentorSessionsPage;
  let fixture: ComponentFixture<MentorSessionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorSessionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
