import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirdropperComponent } from './airdropper.component';

describe('AirdropperComponent', () => {
  let component: AirdropperComponent;
  let fixture: ComponentFixture<AirdropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirdropperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirdropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
