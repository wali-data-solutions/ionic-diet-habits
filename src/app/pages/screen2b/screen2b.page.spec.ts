import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen2bPage } from './screen2b.page';

describe('Screen2bPage', () => {
  let component: Screen2bPage;
  let fixture: ComponentFixture<Screen2bPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen2bPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen2bPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
