import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tel2Component } from './tel2.component';

describe('Tel2Component', () => {
  let component: Tel2Component;
  let fixture: ComponentFixture<Tel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tel2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
