import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  carregando = false;
  model: any = {};
  formSubmited = false;
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if(this.carregando){
      return;
    }
    if(form.invalid){
      this.formSubmited = true;
      this.toastr.error('Preencha os campos corretamente.');
      return;
    }

    this.carregando = true;
    this.autenticacaoService.register(this.model).subscribe(next => {
      this.toastr.success('Registro realizado!');
      this.router.navigate(['']);
      this.carregando = false;
    }, error => {
      this.carregando = false;
    });

  }

  togglePassword(event){
    const type = event.target.parentElement.parentElement.children['senha'].type;
    if(type == 'password'){
      event.target.parentElement.parentElement.children['senha'].type = 'text';
    }
    else{
      event.target.parentElement.parentElement.children['senha'].type = 'password';
    }
  }
}
