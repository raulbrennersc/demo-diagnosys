import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-etapas-fazenda',
  templateUrl: './etapas-fazenda.component.html',
  styleUrls: ['./etapas-fazenda.component.css']
})
export class EtapasFazendaComponent implements OnInit {
  @Input() etapas: any;
  @Input() etapaAtiva: any;
  @Output() alterarEtapa = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  modificarEtapa(idEtapa) {
    this.alterarEtapa.emit(idEtapa);
  }

}
