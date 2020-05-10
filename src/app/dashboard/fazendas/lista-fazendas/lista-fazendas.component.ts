import { Component, OnInit } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-lista-fazendas',
  templateUrl: './lista-fazendas.component.html',
  styleUrls: ['./lista-fazendas.component.css']
})
export class ListaFazendasComponent implements OnInit {

  fazendas: any = [];
  constructor(private fazendaService: FazendasService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.carregarFazendas()
  }

  desativarFazenda(idFazenda) {
    this.fazendaService.desativarFazenda(idFazenda)
      .subscribe(response => {
        this.alertify.success('Fazenda excluida');
        this.carregarFazendas();
      })
  }

  carregarFazendas() {
    this.fazendaService.listarFazendas()
      .subscribe(resposta => this.fazendas = resposta);
  }

}
