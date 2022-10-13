import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirdropperRoutingModule } from './airdropper-routing.module';
import { AirdropperComponent } from './airdropper.component';
import {BroadcastRoutingModule} from "../broadcast/broadcast-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AirdropperComponent
  ],
  imports: [
    CommonModule,
    AirdropperRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class AirdropperModule { }
