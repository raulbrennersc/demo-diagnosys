import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LavouraService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + 'lavouras/';
  fazendaUrl = environment.apiUrl + 'fazendas/';

  listarPorFazenda(idFazenda) {
    return this.http.get(this.fazendaUrl + '/' + idFazenda + '/lavouras');
  }

  listarTodas() {
    return this.http.get(this.baseUrl);
  }

  salvarLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }

  consultarDadosLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }

  consultarDemarcacaoLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }

  consultarTalhoesLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }

  salvarDadosLavoura(idLavoura, dadosLavoura) {
    return this.http.post(this.baseUrl + 'DadosLavoura/' + idLavoura, dadosLavoura);
  }

  salvarDemarcacaoLavoura(idLavoura, demarcacaoLavoura) {
    return this.http.post(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura, demarcacaoLavoura);
  }

  salvarTalhoesLavoura(idLavoura, talhoesLavoura) {
    return this.http.post(this.baseUrl + 'TalhoesLavoura/' + idLavoura, talhoesLavoura);
  }

  editarDadosLavoura(idLavoura, dadosLavoura) {
    return this.http.put(this.baseUrl + 'DadosLavoura/' + idLavoura, dadosLavoura);
  }

  editarDemarcacaoLavoura(idLavoura, demarcacaoLavoura) {
    return this.http.put(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura, demarcacaoLavoura);
  }

  editarTalhoesLavoura(idLavoura, talhoesLavoura) {
    return this.http.put(this.baseUrl + 'TalhoesLavoura/' + idLavoura, talhoesLavoura);
  }

  confirmarLavoura(idLavoura) {
    return this.http.post(this.baseUrl + 'ConclusaoLavoura/' + idLavoura, {});
  }
}
