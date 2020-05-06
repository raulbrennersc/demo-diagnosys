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

  consultarFazendaCompleta(idFazenda: number) {
    return this.http.get(this.baseUrl + idFazenda + '/Completa');
  }

  consultarFazenda(idFazenda: number) {
    return this.http.get(this.baseUrl + idFazenda);
  }

  consultarLocalizacaoFazenda(idFazenda: number){
    return this.http.get(this.baseUrl + 'LocalizacaoFazenda/' + idFazenda);
  }

  consultarDadosFazenda(idFazenda: number){
    return this.http.get(this.baseUrl + 'DadosFazenda/' + idFazenda);
  }

  consultarDemarcacaoFazenda(idFazenda: number){
    return this.http.get(this.baseUrl + 'LocalizacaoGeoFazenda/' + idFazenda);
  }

  salvarLocalizacaoFazenda(localizacaoFazenda: any){
    return this.http.post(this.baseUrl + 'LocalizacaoFazenda/', localizacaoFazenda );
  }

  salvarDadosFazenda(dadosFazenda: any, idFazenda: number){
    return this.http.post(this.baseUrl + 'DadosFazenda/' + idFazenda, dadosFazenda );
  }

  salvarDemarcacaoFazenda(demarcacaoFazenda: any, idFazenda: number){
    return this.http.post(this.baseUrl + 'LocalizacaoGeoFazenda/' + idFazenda, demarcacaoFazenda );
  }

  concluirFazenda(idFazenda: number){
    return this.http.post(this.baseUrl + 'ConclusaoFazenda/' + idFazenda, {});
  }

  atualizarLocalizacaoFazenda(localizacaoFazenda: any, idFazenda: number){
    return this.http.put(this.baseUrl + 'LocalizacaoFazenda/' + idFazenda, localizacaoFazenda );
  }

  atualizarDadosFazenda(dadosFazenda: any, idFazenda: number){
    return this.http.put(this.baseUrl + 'DadosFazenda/' + idFazenda, dadosFazenda );
  }

  atualizarDemarcacaoFazenda(demarcacaoFazenda: any, idFazenda: number){
    return this.http.put(this.baseUrl + 'LocalizacaoGeoFazenda/' + idFazenda, demarcacaoFazenda );
  }

}
