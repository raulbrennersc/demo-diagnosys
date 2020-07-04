import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper =  new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {
    this.setDecodedToken();
   }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user && !user.primeiroAcesso) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
          else if(user && user.primeiroAcesso){
            alert('erro');
            throw {error: 'Você precisa aceitar os termos para utilizar o serviço.'};
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setDecodedToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }

  }
}
