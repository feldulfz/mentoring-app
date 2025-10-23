import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylearning } from './mylearning';

describe('Mylearning', () => {
  let component: Mylearning;
  let fixture: ComponentFixture<Mylearning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mylearning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mylearning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
