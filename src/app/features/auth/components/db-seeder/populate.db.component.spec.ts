import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulateDbComponent } from './populate.db.component';

describe('PopulateDbComponent', () => {
  let component: PopulateDbComponent;
  let fixture: ComponentFixture<PopulateDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulateDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulateDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
