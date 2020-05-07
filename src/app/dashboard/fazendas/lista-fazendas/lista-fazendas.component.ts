import { Component, OnInit } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';

@Component({
  selector: 'app-lista-fazendas',
  templateUrl: './lista-fazendas.component.html',
  styleUrls: ['./lista-fazendas.component.css']
})
export class ListaFazendasComponent implements OnInit {

  fazendas: any = [];
  constructor(private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.carregarFazendas()
  }

  desativarFazenda(idFazenda) {
    this.fazendaService.desativarFazenda(idFazenda)
      .subscribe(response => {
        alert('Fazenda excluida');
        this.carregarFazendas();
      }, response => {
        alert(response.error);
      })
  }

  carregarFazendas() {
    this.fazendaService.listarFazendas()
      .subscribe(resposta => this.fazendas = resposta,
        response => alert(response.error));
  }

}
