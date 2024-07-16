import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStep2Component } from './quote-step2.component';

describe('QuoteStep2Component', () => {
  let component: QuoteStep2Component;
  let fixture: ComponentFixture<QuoteStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
