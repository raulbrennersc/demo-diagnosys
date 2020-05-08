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
    this.http.get(this.fazendaUrl + '/' + idFazenda + '/lavouras');
  }

  listarTodas() {
    this.http.get(this.baseUrl);
  }

  salvarLavoura(idLavoura) {
    this.http.get(this.baseUrl + idLavoura);
  }

  consultarDadosLavoura(idLavoura) {
    this.http.get(this.baseUrl + idLavoura);
  }

  consultarDemarcacaoLavoura(idLavoura) {
    this.http.get(this.baseUrl + idLavoura);
  }

  consultarTalhoesLavoura(idLavoura) {
    this.http.get(this.baseUrl + idLavoura);
  }

  salvarDadosLavoura(idLavoura, dadosLavoura) {
    this.http.post(this.baseUrl + 'DadosLavoura/' + idLavoura, dadosLavoura);
  }

  salvarDemarcacaoLavoura(idLavoura, demarcacaoLavoura) {
    this.http.post(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura, demarcacaoLavoura);
  }

  salvarTalhoesLavoura(idLavoura, talhoesLavoura) {
    this.http.post(this.baseUrl + 'TalhoesLavoura/' + idLavoura, talhoesLavoura);
  }

  editarDadosLavoura(idLavoura, dadosLavoura) {
    this.http.put(this.baseUrl + 'DadosLavoura/' + idLavoura, dadosLavoura);
  }

  editarDemarcacaoLavoura(idLavoura, demarcacaoLavoura) {
    this.http.put(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura, demarcacaoLavoura);
  }

  editarTalhoesLavoura(idLavoura, talhoesLavoura) {
    this.http.put(this.baseUrl + 'TalhoesLavoura/' + idLavoura, talhoesLavoura);
  }

  confirmarLavoura(idLavoura) {
    this.http.post(this.baseUrl + 'ConclusaoLavoura/' + idLavoura, {});
  }
}
