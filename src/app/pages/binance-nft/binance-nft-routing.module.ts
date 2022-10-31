import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AirdropperComponent} from "../airdropper/airdropper.component";
import {BinanceNftComponent} from "./binance-nft.component";

const routes: Routes = [
  { path: '', component: BinanceNftComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinanceNftRoutingModule { }
