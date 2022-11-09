import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrhDropperComponent } from './vrh-dropper.component';

describe('VrhdropperComponent', () => {
  let component: VrhDropperComponent;
  let fixture: ComponentFixture<VrhDropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrhDropperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VrhDropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
