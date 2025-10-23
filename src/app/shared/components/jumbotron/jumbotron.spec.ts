import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jumbotron } from './jumbotron';

describe('Jumbotron', () => {
  let component: Jumbotron;
  let fixture: ComponentFixture<Jumbotron>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jumbotron]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jumbotron);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
