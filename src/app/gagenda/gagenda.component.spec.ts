import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GagendaComponent } from './gagenda.component';

describe('GagendaComponent', () => {
  let component: GagendaComponent;
  let fixture: ComponentFixture<GagendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GagendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
