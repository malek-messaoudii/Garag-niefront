import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Devis2Component } from './devis2.component';

describe('Devis2Component', () => {
  let component: Devis2Component;
  let fixture: ComponentFixture<Devis2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Devis2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Devis2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
