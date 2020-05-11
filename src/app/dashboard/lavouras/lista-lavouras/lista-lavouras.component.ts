import { Component, OnInit } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-lavouras',
  templateUrl: './lista-lavouras.component.html',
  styleUrls: ['./lista-lavouras.component.css']
})
export class ListaLavourasComponent implements OnInit {
  lavourasCarregadas = false;
  lavouras: any = [];
  idFazenda = 0;
  podeCadastrar = false;

  constructor(private lavouraService: LavouraService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idFazenda = params['id'];
      if (this.idFazenda) {
        this.carregarLavourasPorFazenda()
      }
      else {
        this.carregarLavourasPorUsuario();
      }
    });
  }

  carregarLavourasPorFazenda() {
    this.lavouraService.listarPorFazenda(this.idFazenda)
      .subscribe(response => {
        this.lavouras = response;
        this.lavourasCarregadas = true;
      });
  }

  carregarLavourasPorUsuario() {
    this.lavouraService.listarTodas()
      .subscribe(response => {
        this.lavouras = response;
        this.lavourasCarregadas = true;
      });
  }

  excluirLavoura(idLavoura) {
    this.lavouraService.excluirLavoura(idLavoura)
      .subscribe(response => {
        if (this.idFazenda) {
          this.carregarLavourasPorFazenda();
        }
        else {
          this.carregarLavourasPorUsuario();
        }
      })
  }

}
