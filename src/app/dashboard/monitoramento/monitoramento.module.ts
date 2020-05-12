import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { MonitoramentoRoutingModule } from './monitoramento-routing.module';

import { MonitoramentoComponent } from './monitoramento.component';
import { ListaMonitoramentoComponent } from './lista-monitoramento/lista-monitoramento.component';
import { CadastroMonitoramentoComponent } from './cadastro-monitoramento/cadastro-monitoramento.component';


@NgModule({
  declarations: [MonitoramentoComponent, ListaMonitoramentoComponent, CadastroMonitoramentoComponent],
  imports: [
    CommonModule,
    MonitoramentoRoutingModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class MonitoramentoModule { }
