import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMentorComponents } from './sign-up-mentor.components';

describe('SignUpMentorComponents', () => {
  let component: SignUpMentorComponents;
  let fixture: ComponentFixture<SignUpMentorComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpMentorComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpMentorComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
