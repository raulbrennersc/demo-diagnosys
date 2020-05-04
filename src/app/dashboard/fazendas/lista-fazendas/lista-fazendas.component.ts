import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-fazendas',
  templateUrl: './lista-fazendas.component.html',
  styleUrls: ['./lista-fazendas.component.css']
})
export class ListaFazendasComponent implements OnInit {

  fazendas: any = [{
    nome: 'fazenda 1'
  },
  {
    nome: 'fazenda 2'
  },
  {
    nome: 'fazenda 3'
  },
  {
    nome: 'fazenda 4'
  },
  {
    nome: 'fazenda 5'
  },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
