import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentriSportiviComponent } from './centri-sportivi.component';

describe('CentriSportiviComponent', () => {
  let component: CentriSportiviComponent;
  let fixture: ComponentFixture<CentriSportiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentriSportiviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentriSportiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
