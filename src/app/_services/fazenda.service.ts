import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FazendasService {
  baseUrl = environment.apiUrl + 'fazendas/';
  constructor(private http: HttpClient) { }

  listarFazendas() {
    return this.http.get(this.baseUrl);
  }

}
