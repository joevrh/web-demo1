import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinanceNftComponent } from './binance-nft.component';

describe('BinanceNftComponent', () => {
  let component: BinanceNftComponent;
  let fixture: ComponentFixture<BinanceNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinanceNftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinanceNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
