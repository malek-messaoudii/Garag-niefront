import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiontelComponent } from './sectiontel.component';

describe('SectiontelComponent', () => {
  let component: SectiontelComponent;
  let fixture: ComponentFixture<SectiontelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectiontelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectiontelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
