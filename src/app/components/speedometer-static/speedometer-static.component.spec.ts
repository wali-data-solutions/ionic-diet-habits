import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedometerStaticPage } from './speedometer-static.page';

describe('SpeedometerStaticPage', () => {
  let component: SpeedometerStaticPage;
  let fixture: ComponentFixture<SpeedometerStaticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedometerStaticPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedometerStaticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
