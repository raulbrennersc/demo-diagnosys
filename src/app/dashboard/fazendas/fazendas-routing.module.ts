import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FazendasComponent } from './fazendas.component';
import { ListaFazendasComponent } from './lista-fazendas/lista-fazendas.component';

const routes: Routes = [{ path: '', component: ListaFazendasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FazendasRoutingModule { }
