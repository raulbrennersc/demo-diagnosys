import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoramentoRoutingModule } from './monitoramento-routing.module';
import { MonitoramentoComponent } from './monitoramento.component';
import { ListaMonitoramentoComponent } from './lista-monitoramento/lista-monitoramento.component';


@NgModule({
  declarations: [MonitoramentoComponent, ListaMonitoramentoComponent],
  imports: [
    CommonModule,
    MonitoramentoRoutingModule
  ]
})
export class MonitoramentoModule { }
