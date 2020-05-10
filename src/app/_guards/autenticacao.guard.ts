import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../_services/autenticacao.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoGuard implements CanActivate {
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private alertify: AlertifyService) { }
  canActivate(): boolean {
    if (this.autenticacaoService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!');
    this.router.navigate(['/']);
    return false;
  }

}
