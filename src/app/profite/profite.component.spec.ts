import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiteComponent } from './profite.component';

describe('ProfiteComponent', () => {
  let component: ProfiteComponent;
  let fixture: ComponentFixture<ProfiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
