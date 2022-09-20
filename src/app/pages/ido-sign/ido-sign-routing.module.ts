import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IdoSignComponent} from "./ido-sign.component";

const routes: Routes = [
{ path: '', component: IdoSignComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdoSignRoutingModule { }
