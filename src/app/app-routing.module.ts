import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ledger' },
  { path: 'ledger', loadChildren: () => import('./pages/ledger/ledger.module').then(m => m.LedgerModule) },
  { path: 'broadcast', loadChildren: () => import('./pages/broadcast/broadcast.module').then(m => m.BroadcastModule) },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'subgraph', loadChildren: () => import('./pages/subgraph/subgraph.module').then(m => m.SubgraphModule) },
  { path: 'ido', loadChildren: () => import('./pages/ido/ido.module').then(m => m.IdoModule) },
  { path: 'ido-sign', loadChildren: () => import('./pages/ido-sign/ido-sign.module').then(m => m.IdoSignModule) },
  { path: 'recapcha', loadChildren: () => import('./pages/recapcha/recapcha.module').then(m => m.RecapchaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
