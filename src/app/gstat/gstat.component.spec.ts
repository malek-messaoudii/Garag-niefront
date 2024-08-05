import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstatComponent } from './gstat.component';

describe('GstatComponent', () => {
  let component: GstatComponent;
  let fixture: ComponentFixture<GstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
