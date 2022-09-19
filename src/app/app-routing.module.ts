import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ido' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'subgraph', loadChildren: () => import('./pages/subgraph/subgraph.module').then(m => m.SubgraphModule) },
  { path: 'ido', loadChildren: () => import('./pages/ido/ido.module').then(m => m.IdoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
