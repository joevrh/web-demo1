import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdoSignRoutingModule } from './ido-sign-routing.module';
import {IdoComponent} from "../ido/ido.component";
import {IdoSignComponent} from "./ido-sign.component";
import {IdoRoutingModule} from "../ido/ido-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    IdoSignComponent],
  imports: [
    CommonModule,
    IdoSignRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class IdoSignModule { }
