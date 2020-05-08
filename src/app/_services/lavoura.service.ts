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
  fazendaAtual = 0;

  listarPorFazenda(idFazenda) {
    return this.http.get(this.fazendaUrl + '/' + idFazenda + '/lavouras');
  }

  listarTodas() {
    return this.http.get(this.baseUrl);
  }

  consultarLavoura(idLavoura) {
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

  salvarDadosLavoura(idFazenda, dadosLavoura) {
    return this.http.post(this.baseUrl + 'DadosLavoura/' + idFazenda, dadosLavoura);
  }

  salvarDemarcacaoLavoura(idLavoura, demarcacaoLavoura) {
    return this.http.post(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura, demarcacaoLavoura);
  }

  salvarTalhoesLavoura(idLavoura, talhoesLavoura) {
    return this.http.post(this.baseUrl + 'TalhoesLavoura/' + idLavoura, talhoesLavoura);
  }

  atualizarDadosLavoura(idLavoura, dadosLavoura) {
    return this.http.put(this.baseUrl + 'DadosLavoura/' + idLavoura, dadosLavoura);
  }

  atualizarDemarcacaoLavoura(idLavoura, demarcacaoLavoura) {
    return this.http.put(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura, demarcacaoLavoura);
  }

  atualizarTalhoesLavoura(idLavoura, talhoesLavoura) {
    return this.http.put(this.baseUrl + 'TalhoesLavoura/' + idLavoura, talhoesLavoura);
  }

  confirmarLavoura(idLavoura) {
    return this.http.post(this.baseUrl + 'ConclusaoLavoura/' + idLavoura, {});
  }
}
