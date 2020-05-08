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

  constructor(private lavourasService: LavouraService, private activatedRoute: ActivatedRoute) { }

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
    this.lavourasService.listarPorFazenda(this.idFazenda)
      .subscribe(response => {
        this.lavouras = response;
        this.lavourasCarregadas = true;
      });
  }

  carregarLavourasPorUsuario() {
    this.lavourasService.listarTodas()
      .subscribe(response => {
        this.lavouras = response;
        this.lavourasCarregadas = true;
      });
  }

}
