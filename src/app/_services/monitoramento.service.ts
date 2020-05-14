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

  consultarMonitoramento(idMonitoramento) {
    return this.http.get(this.baseUrl + idMonitoramento);
  }

  consultarMonitoramentoFazenda(idFazenda) {
    return this.http.get(this.baseUrl + 'fazenda/' + idFazenda);
  }


  listarTodos() {
    return this.http.get(this.baseUrl);
  }

  consultarLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }

  excluirMonitoramento(idMonitoramento) {
    return this.http.delete(this.baseUrl);
  }

  salvarMonitoramento(monitoramento) {
    return this.http.post(this.baseUrl, monitoramento);
  }
}
