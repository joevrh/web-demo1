import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IdoComponent} from "../ido/ido.component";
import {RecapchaComponent} from "./recapcha.component";

const routes: Routes = [
  { path: '', component: RecapchaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecapchaRoutingModule { }
