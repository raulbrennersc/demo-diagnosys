import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FazendasRoutingModule } from './fazendas-routing.module';
import { FazendasComponent } from './fazendas.component';
import { ListaFazendasComponent } from './lista-fazendas/lista-fazendas.component';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [FazendasComponent, ListaFazendasComponent, CadastroComponent],
  imports: [
    CommonModule,
    FazendasRoutingModule
  ]
})
export class FazendasModule { }
