import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsMenteePage } from './mentors-mentee-page';

describe('MentorsMenteePage', () => {
  let component: MentorsMenteePage;
  let fixture: ComponentFixture<MentorsMenteePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorsMenteePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorsMenteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
