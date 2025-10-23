import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoleComponents } from './select-role.components';

describe('SelectRoleComponents', () => {
  let component: SelectRoleComponents;
  let fixture: ComponentFixture<SelectRoleComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRoleComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRoleComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
