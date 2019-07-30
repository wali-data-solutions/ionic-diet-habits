import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen2Page } from './screen2.page';

describe('Screen2Page', () => {
  let component: Screen2Page;
  let fixture: ComponentFixture<Screen2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
