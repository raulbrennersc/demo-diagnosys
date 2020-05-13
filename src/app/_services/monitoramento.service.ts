import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + 'monitoramentos/';
  fazendaUrl = environment.apiUrl + 'fazendas/';
  
  listarFazendasMonitoramento() {
    return this.http.get(this.baseUrl + 'fazendas');
  }

  listarPorFazenda(idFazenda) {
    return this.http.get(this.fazendaUrl + 'monitoramentos' + idFazenda);
  }


  listarTodos() {
    return this.http.get(this.baseUrl);
  }

  consultarLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }
}