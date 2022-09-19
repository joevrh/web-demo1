import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "../welcome/welcome.component";
import {SubgraphComponent} from "./subgraph.component";

const routes: Routes = [
  { path: '', component: SubgraphComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgraphRoutingModule { }
