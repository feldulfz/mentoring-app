import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMenteeComponents } from './sign-up-mentee.components';

describe('SignUpMenteeComponents', () => {
  let component: SignUpMenteeComponents;
  let fixture: ComponentFixture<SignUpMenteeComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpMenteeComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpMenteeComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
