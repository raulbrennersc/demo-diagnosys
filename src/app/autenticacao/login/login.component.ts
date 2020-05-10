import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.loggedIn()) {
      this.router.navigate(['/painel']);
    }
  }

  login() {
    this.autenticacaoService.login(this.model).subscribe(next => {
      this.alertify.success('Login realizado!');
      this.router.navigate(['/painel']);
    }, error => {
      this.alertify.error('Login e/ou senha incorretos!');
    }, () => {

    });

  }

  loggedIn() {
    return this.autenticacaoService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
