import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BroadcastComponent} from "../broadcast/broadcast.component";
import {LedgerComponent} from "./ledger.component";

const routes: Routes = [
  { path: '', component: LedgerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerRoutingModule { }
