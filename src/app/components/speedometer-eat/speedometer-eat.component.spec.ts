import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedometerEatPage } from './speedometer-eat.page';

describe('SpeedometerEatPage', () => {
  let component: SpeedometerEatPage;
  let fixture: ComponentFixture<SpeedometerEatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedometerEatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedometerEatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
