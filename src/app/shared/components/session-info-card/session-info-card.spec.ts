import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInfoCard } from './session-info-card';

describe('SessionInfoCard', () => {
  let component: SessionInfoCard;
  let fixture: ComponentFixture<SessionInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionInfoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionInfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
