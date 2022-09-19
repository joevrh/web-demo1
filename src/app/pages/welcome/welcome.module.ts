import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [WelcomeRoutingModule, NzButtonModule,
    NzFormModule,
    FormsModule,],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
