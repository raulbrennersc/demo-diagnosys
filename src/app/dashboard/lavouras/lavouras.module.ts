import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { LavourasRoutingModule } from './lavouras-routing.module';
import { FormsModule } from '@angular/forms';


import { LavourasComponent } from './lavouras.component';
import { ListaLavourasComponent } from './lista-lavouras/lista-lavouras.component';
import { CadastroLavouraComponent } from './cadastro-lavoura/cadastro-lavoura.component';
import { DadosLavouraComponent } from './dados-lavoura/dados-lavoura.component';
import { DemarcacaoLavouraComponent } from './demarcacao-lavoura/demarcacao-lavoura.component';
import { TalhoesLavouraComponent } from './talhoes-lavoura/talhoes-lavoura.component';
import { ConfirmacaoLavouraComponent } from './confirmacao-lavoura/confirmacao-lavoura.component';


@NgModule({
  declarations: [LavourasComponent, ListaLavourasComponent, CadastroLavouraComponent, DadosLavouraComponent, DemarcacaoLavouraComponent, TalhoesLavouraComponent, ConfirmacaoLavouraComponent],
  imports: [
    CommonModule,
    LavourasRoutingModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class LavourasModule { }
