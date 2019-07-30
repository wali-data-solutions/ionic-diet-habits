import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedometerGuiltPage } from './speedometer-guilt.page';

describe('SpeedometerGuiltPage', () => {
  let component: SpeedometerGuiltPage;
  let fixture: ComponentFixture<SpeedometerGuiltPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedometerGuiltPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedometerGuiltPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
