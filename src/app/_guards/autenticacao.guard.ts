import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../_services/autenticacao.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoGuard implements CanActivate {
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private toastr: ToastrService) { }
  canActivate(): boolean {
    if (this.autenticacaoService.loggedIn()) {
      return true;
    }

    this.toastr.error('You shall not pass!');
    this.router.navigate(['/']);
    return false;
  }

}
