import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ModalTermoComponent } from './modal-termo/modal-termo.component';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, ModalTermoComponent],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    FormsModule,
    NgxMaskModule
  ]
})
export class AutenticacaoModule { }
