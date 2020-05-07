import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasFazendaComponent implements OnInit {
  @Input() etapas: any[];
  @Input() etapaFazenda: any;
  @Input() etapaAtual: any;
  @Output() alterarEtapa = new EventEmitter<number>();
  ultimaEtapa: any;
  constructor() { }

  ngOnInit(): void {
    this.etapaAtual = this.etapaFazenda;
    this.ultimaEtapa = this.etapas[this.etapas.length - 1].id;
  }

  modificarEtapa(idNovaEtapa) {
    if (idNovaEtapa <= this.etapaFazenda) {
      this.etapas.forEach(etapa => {
        etapa.disabled = etapa.id > this.etapaFazenda;
      });
      this.etapaAtual = idNovaEtapa;
      this.alterarEtapa.emit(idNovaEtapa);
    }
  }
}
