import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LavourasRoutingModule } from './lavouras-routing.module';
import { LavourasComponent } from './lavouras.component';
import { ListaLavourasComponent } from './lista-lavouras/lista-lavouras.component';
import { CadastroLavouraComponent } from './cadastro-lavoura/cadastro-lavoura.component';


@NgModule({
  declarations: [LavourasComponent, ListaLavourasComponent, CadastroLavouraComponent],
  imports: [
    CommonModule,
    LavourasRoutingModule
  ]
})
export class LavourasModule { }
