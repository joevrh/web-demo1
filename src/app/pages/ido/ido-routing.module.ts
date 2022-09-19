import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IdoComponent} from './ido.component';

const routes: Routes = [
  { path: '', component: IdoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdoRoutingModule { }
