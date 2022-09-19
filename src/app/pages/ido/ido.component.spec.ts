import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdoComponent } from './ido.component';

describe('IdoComponent', () => {
  let component: IdoComponent;
  let fixture: ComponentFixture<IdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
