import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AirdropperComponent} from "./airdropper.component";

const routes: Routes = [
  { path: '', component: AirdropperComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirdropperRoutingModule { }
