import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmacao-fazenda',
  templateUrl: './confirmacao-fazenda.component.html',
  styleUrls: ['./confirmacao-fazenda.component.css']
})
export class ConfirmacaoFazendaComponent implements OnInit {
  @Input() idFazenda: number;

  constructor() { }

  ngOnInit(): void {
  }

}
