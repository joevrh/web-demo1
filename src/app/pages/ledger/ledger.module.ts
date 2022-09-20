import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger.component';
import {IdoRoutingModule} from "../ido/ido-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LedgerComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class LedgerModule { }
