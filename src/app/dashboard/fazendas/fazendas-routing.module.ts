import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaFazendasComponent } from './lista-fazendas/lista-fazendas.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  { path: '', component: ListaFazendasComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:id', component: CadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FazendasRoutingModule { }
