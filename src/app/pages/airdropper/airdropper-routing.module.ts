import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AirdropperComponent} from "./airdropper.component";
import {VrhDropperComponent} from "./vrh-dropper/vrh-dropper.component";

const routes: Routes = [
  { path: '', component: AirdropperComponent },
  { path: 'moh-dropper', component: AirdropperComponent },
  { path: 'vrh-dropper', component: VrhDropperComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirdropperRoutingModule { }
