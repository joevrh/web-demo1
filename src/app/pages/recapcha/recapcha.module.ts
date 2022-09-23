import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecapchaRoutingModule } from './recapcha-routing.module';
import { RecapchaComponent } from './recapcha.component';
import {IdoRoutingModule} from "../ido/ido-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {RecaptchaModule} from "ng-recaptcha";


@NgModule({
  declarations: [
    RecapchaComponent
  ],
  imports: [
    CommonModule,
    RecapchaRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
    RecaptchaModule
  ]
})
export class RecapchaModule { }
