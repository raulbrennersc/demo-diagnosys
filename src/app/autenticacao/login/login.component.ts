import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  carregando = false;
  model: any = {};
  formSubmited = false;
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.loggedIn()) {
      this.router.navigate(['/painel']);
    }
  }

  login(form: NgForm) {
    if(this.carregando){
      return;
    }
    if(form.invalid){
      this.formSubmited = true;
      this.alertify.error('Preencha os campos corretamente.');
      return;
    }
    this.carregando = true;
    this.autenticacaoService.login(this.model).subscribe(response => {
      this.alertify.success('Login realizado!');
      this.router.navigate(['/painel']);
    }, error => {
      this.carregando = false;
      this.alertify.error(error.error);
    }, () => {

    });

  }

  loggedIn() {
    return this.autenticacaoService.loggedIn();
  }
}
