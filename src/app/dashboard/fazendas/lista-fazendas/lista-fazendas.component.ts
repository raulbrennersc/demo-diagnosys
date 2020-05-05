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
    this.fazendaService.listarFazendas()
    .subscribe(resposta => this.fazendas = resposta);
  }

}
