import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FazendasRoutingModule } from './fazendas-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { NgxMaskModule } from 'ngx-mask'


import { FazendasComponent } from './fazendas.component';
import { ListaFazendasComponent } from './lista-fazendas/lista-fazendas.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LocalizacaoFazendaComponent } from './localizacao-fazenda/localizacao-fazenda.component';
import { DadosFazendaComponent } from './dados-fazenda/dados-fazenda.component';
import { DemarcacaoFazendaComponent } from './demarcacao-fazenda/demarcacao-fazenda.component';
import { ConfirmacaoFazendaComponent } from './confirmacao-fazenda/confirmacao-fazenda.component';


@NgModule({
  declarations: [FazendasComponent, ListaFazendasComponent, CadastroComponent, LocalizacaoFazendaComponent, DadosFazendaComponent, DemarcacaoFazendaComponent, ConfirmacaoFazendaComponent],
  imports: [
    CommonModule,
    FazendasRoutingModule,
    FormsModule,
    SharedComponentsModule,
    NgxMaskModule.forChild()
  ]
})
export class FazendasModule { }
