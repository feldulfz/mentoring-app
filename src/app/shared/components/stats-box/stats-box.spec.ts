import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBox } from './stats-box';

describe('StatsBox', () => {
  let component: StatsBox;
  let fixture: ComponentFixture<StatsBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
