import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Devisexpress2Component } from './devisexpress2.component';

describe('Devisexpress2Component', () => {
  let component: Devisexpress2Component;
  let fixture: ComponentFixture<Devisexpress2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Devisexpress2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Devisexpress2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
