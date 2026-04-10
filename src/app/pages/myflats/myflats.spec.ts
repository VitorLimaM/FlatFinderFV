import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myflats } from './myflats';

describe('Myflats', () => {
  let component: Myflats;
  let fixture: ComponentFixture<Myflats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myflats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myflats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
