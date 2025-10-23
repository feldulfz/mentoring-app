import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMentor } from './about-mentor';

describe('AboutMentor', () => {
  let component: AboutMentor;
  let fixture: ComponentFixture<AboutMentor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMentor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMentor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
