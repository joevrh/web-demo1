import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import {AirdropperRoutingModule} from "../airdropper/airdropper-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class TransferModule { }
