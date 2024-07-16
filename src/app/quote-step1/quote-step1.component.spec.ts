import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStep1Component } from './quote-step1.component';

describe('QuoteStep1Component', () => {
  let component: QuoteStep1Component;
  let fixture: ComponentFixture<QuoteStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
