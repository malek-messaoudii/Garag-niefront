import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiturepretComponent } from './voiturepret.component';

describe('VoiturepretComponent', () => {
  let component: VoiturepretComponent;
  let fixture: ComponentFixture<VoiturepretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiturepretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiturepretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
