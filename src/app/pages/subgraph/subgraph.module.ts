import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubgraphRoutingModule } from './subgraph-routing.module';
import { SubgraphComponent } from './subgraph.component';


@NgModule({
  declarations: [
    SubgraphComponent
  ],
  imports: [
    CommonModule,
    SubgraphRoutingModule
  ]
})
export class SubgraphModule { }
