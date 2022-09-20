import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastRoutingModule } from './broadcast-routing.module';
import { BroadcastComponent } from './broadcast.component';
import {IdoRoutingModule} from "../ido/ido-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BroadcastComponent
  ],
  imports: [
    CommonModule,
    BroadcastRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class BroadcastModule { }
