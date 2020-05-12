import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ModulosComponent } from './modulos/modulos.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    { path: '', component: ModulosComponent },
    { path: 'fazendas', loadChildren: () => import('./fazendas/fazendas.module').then(m => m.FazendasModule) },
    { path: 'lavouras', loadChildren: () => import('./lavouras/lavouras.module').then(m => m.LavourasModule) },
    { path: 'monitoramento', loadChildren: () => import('./monitoramento/monitoramento.module').then(m => m.MonitoramentoModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
