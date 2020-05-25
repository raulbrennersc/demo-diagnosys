import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  model: any = {};
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.autenticacaoService.register(this.model).subscribe(next => {
      this.alertify.success('Registro realizado!');
      this.router.navigate(['']);
    });

  }

  togglePassword(event){
    const type = event.target.parentElement.parentElement.children['senha'].type
    if(type == 'password'){
      event.target.parentElement.parentElement.children['senha'].type = 'text';
    }
    else{
      event.target.parentElement.parentElement.children['senha'].type = 'password';
    }
  }
}
