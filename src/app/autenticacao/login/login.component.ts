import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.autenticacaoService.login(this.model).subscribe(next => {
      alert('login realizado');
      this.router.navigate(['/dashboard']);
    }, error => {
      alert('falha ao realizar login');
    }, () => {
      
    });

  }

  loggedIn() {
    return this.autenticacaoService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    // this.router.navigate(['/login']);
  }

}
