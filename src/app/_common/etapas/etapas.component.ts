import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasComponent implements OnInit {
  @Input() etapas: any[];
  @Input() etapaInicial: any;
  @Input() etapaAtual: any;
  @Output() alterarEtapa = new EventEmitter<number>();
  ultimaEtapa: any;
  constructor() { }

  ngOnInit(): void {
    this.etapaAtual = this.etapaInicial;
    this.ultimaEtapa = this.etapas[this.etapas.length - 1].id;
  }

  modificarEtapa(idNovaEtapa) {
    if (idNovaEtapa <= this.etapaInicial) {
      this.etapas.forEach(etapa => {
        etapa.disabled = etapa.id > this.etapaInicial;
      });
      this.etapaAtual = idNovaEtapa;
      this.alterarEtapa.emit(idNovaEtapa);
    }
  }
}
