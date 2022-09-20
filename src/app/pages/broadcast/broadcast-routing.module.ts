import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IdoComponent} from "../ido/ido.component";
import {BroadcastComponent} from "./broadcast.component";

const routes: Routes = [
  { path: '', component: BroadcastComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastRoutingModule { }
