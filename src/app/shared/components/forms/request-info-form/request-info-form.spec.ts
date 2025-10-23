import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInfoForm } from './request-info-form';

describe('RequestInfoForm', () => {
  let component: RequestInfoForm;
  let fixture: ComponentFixture<RequestInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
