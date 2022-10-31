import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BinanceNftRoutingModule } from './binance-nft-routing.module';
import { BinanceNftComponent } from './binance-nft.component';
import {LedgerRoutingModule} from "../ledger/ledger-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BinanceNftComponent
  ],
  imports: [
    CommonModule,
    BinanceNftRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class BinanceNftModule { }
