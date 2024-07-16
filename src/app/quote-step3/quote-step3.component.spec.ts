import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStep3Component } from './quote-step3.component';

describe('QuoteStep3Component', () => {
  let component: QuoteStep3Component;
  let fixture: ComponentFixture<QuoteStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
