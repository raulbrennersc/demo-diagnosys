import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticService {
  baseUrl = environment.apiUrl + 'static/';
  constructor(private http: HttpClient) { }

  listarEstados() {
    return this.http.get(this.baseUrl + 'estado');
  }

  listarMunicipios(idEstado) {
    return this.http.get(this.baseUrl + 'estado/' + idEstado + '/municipios');
  }

  listarCulturas() {
    return this.http.get(this.baseUrl + 'culturas');
  }

}
