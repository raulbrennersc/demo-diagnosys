import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalTermoComponent } from '../autenticacao/modal-termo/modal-termo.component';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper =  new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, public matDialog: MatDialog) {
    this.setDecodedToken();
   }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
          const user = response;
          if (user && !user.primeiroAcesso) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
          else if(user && user.primeiroAcesso){
            return this.openModal(model);
          }
        })
      );
  }

  openModal(model) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = model;
    // https://material.angular.io/components/dialog/overview
    return this.matDialog.open(ModalTermoComponent, dialogConfig).afterClosed();
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  aceitaTermo(usuario){
    return this.http.put(this.baseUrl + 'AceitarTermo', usuario);
  }

  setDecodedToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }

  }
}
