import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { FazendaToList } from '../_models/fazendas/fazenda-to-list';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FazendasService {
  baseUrl = environment.apiUrl + 'fazendas/';
  constructor(private http: HttpClient) { }

  listarFazendas(): Observable<FazendaToList[]> {
    return this.http.get(this.baseUrl)
      .pipe(
        map((fazendas: FazendaToList[]) => {
          return fazendas;
        })
      );
  }

}
