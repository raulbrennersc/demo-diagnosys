import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LavourasComponent } from './lavouras.component';
import { ListaLavourasComponent } from './lista-lavouras/lista-lavouras.component';
import { CadastroLavouraComponent } from './cadastro-lavoura/cadastro-lavoura.component';

const routes: Routes = [
  { path: '', component: ListaLavourasComponent },
  { path: 'cadastro', component: CadastroLavouraComponent },
  { path: 'cadastro/:id', component: CadastroLavouraComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LavourasRoutingModule { }
