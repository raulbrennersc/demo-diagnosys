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
    return this.http.get(this.fazendaUrl + idFazenda + '/lavouras');
  }

  listarTodas() {
    return this.http.get(this.baseUrl);
  }

  consultarLavoura(idLavoura) {
    return this.http.get(this.baseUrl + idLavoura);
  }

  consultarLavouraCompleta(idLavoura: number) {
    return this.http.get(this.baseUrl + idLavoura + '/Completa');
  }

  consultarDadosLavoura(idLavoura) {
    return this.http.get(this.baseUrl + 'DadosLavoura/' + idLavoura);
  }

  consultarDemarcacaoLavoura(idLavoura) {
    return this.http.get(this.baseUrl + 'DemarcacaoLavoura/' + idLavoura);
  }

  consultarTalhoesLavoura(idLavoura) {
    return this.http.get(this.baseUrl + 'TalhoesLavoura/' + idLavoura);
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

  concluirLavoura(idLavoura) {
    return this.http.post(this.baseUrl + 'ConclusaoLavoura/' + idLavoura, {});
  }
  excluirLavoura(idLavoura) {
    return this.http.post(this.baseUrl + 'ExcluirLavoura/' + idLavoura, {});
  }
}
