import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoramentoComponent } from './monitoramento.component';
import { ListaMonitoramentoComponent } from './lista-monitoramento/lista-monitoramento.component';
import { CadastroMonitoramentoComponent } from './cadastro-monitoramento/cadastro-monitoramento.component';

const routes: Routes = [
  { path: '', component: ListaMonitoramentoComponent },
  { path: 'cadastro', component: CadastroMonitoramentoComponent },
  { path: 'cadastro/:id', component: CadastroMonitoramentoComponent },
  { path: ':id', component: ListaMonitoramentoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoramentoRoutingModule { }
