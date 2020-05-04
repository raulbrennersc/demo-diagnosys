import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FazendasRoutingModule } from './fazendas-routing.module';
import { FazendasComponent } from './fazendas.component';
import { ListaFazendasComponent } from './lista-fazendas/lista-fazendas.component';


@NgModule({
  declarations: [FazendasComponent, ListaFazendasComponent],
  imports: [
    CommonModule,
    FazendasRoutingModule
  ]
})
export class FazendasModule { }
