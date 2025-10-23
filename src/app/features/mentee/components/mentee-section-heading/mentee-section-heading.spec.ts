import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeSectionHeading } from './mentee-section-heading';

describe('MenteeSectionHeading', () => {
  let component: MenteeSectionHeading;
  let fixture: ComponentFixture<MenteeSectionHeading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenteeSectionHeading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenteeSectionHeading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
