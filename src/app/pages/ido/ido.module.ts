import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdoRoutingModule } from './ido-routing.module';
import { IdoComponent } from './ido.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    IdoComponent
  ],
  imports: [
    CommonModule,
    IdoRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,
  ]
})
export class IdoModule { }
