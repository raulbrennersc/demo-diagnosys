import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../_services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoGuard implements CanActivate {
  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }
  canActivate(): boolean {
    if (this.autenticacaoService.loggedIn()) {
      alert('ta logado!');
     return true;
    }

    alert('You shall not pass!');
    this.router.navigate(['/autenticacao/login']);
    return false;
  }
  
}
