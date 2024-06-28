import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStep4Component } from './quote-step4.component';

describe('QuoteStep4Component', () => {
  let component: QuoteStep4Component;
  let fixture: ComponentFixture<QuoteStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteStep4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
