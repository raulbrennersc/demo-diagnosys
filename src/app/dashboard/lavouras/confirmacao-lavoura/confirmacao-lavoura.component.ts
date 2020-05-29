import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { GeometriaService } from 'src/app/_services/geometria.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-confirmacao-lavoura',
  templateUrl: './confirmacao-lavoura.component.html',
  styleUrls: ['./confirmacao-lavoura.component.css']
})
export class ConfirmacaoLavouraComponent implements OnInit {
  @Input() lavoura: any;
  @Output() confirmar = new EventEmitter<boolean>();

  etapaCarregada = false;

  constructor(private lavouraService: LavouraService, private geometriaService: GeometriaService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.carregarEtapa();
  }

  carregarEtapa() {
    this.lavouraService.consultarLavouraCompleta(this.lavoura.id)
      .subscribe(response => {
        let lavoura = response as any;
        lavoura.demarcacaoFazenda = (this.geometriaService.montarGeometriaFazenda(lavoura.demarcacaoFazenda));
        lavoura.demarcacao = (this.geometriaService.montarGeometriaLavoura(lavoura.demarcacao));
        lavoura.talhoes = lavoura.talhoes.map(t => this.geometriaService.montarGeometriaTalhao(t));
        lavoura.conjuntoGeometrias = [lavoura.demarcacaoFazenda, lavoura.demarcacao, ...lavoura.talhoes]
        this.lavoura = lavoura;
        this.etapaCarregada = true;
        this.calcularValores();
      });
  }

  confirmarLavoura() {
    if (this.lavoura.concluida) {
      this.confirmar.emit();
      return;
    }
    this.lavouraService.concluirLavoura(this.lavoura.id)
      .subscribe(response => {
        this.alertify.success('Cadastro de lavoura concluído!');
        this.confirmar.emit(false);
      })
  }

  calcularValores() {
    if (isNaN(this.lavoura.dadosLavoura.areaTotal) || isNaN(this.lavoura.dadosLavoura.espacamentoHorizontal) || isNaN(this.lavoura.dadosLavoura.espacamentoVertical)) {
      this.lavoura.dadosLavoura.nPlantas = 0;
      this.lavoura.dadosLavoura.stand = 0;
      return;
    }
    let nPlantas = (this.lavoura.dadosLavoura.areaTotal * this.lavoura.dadosLavoura.espacamentoHorizontal * this.lavoura.dadosLavoura.espacamentoVertical / 10000).toString();
    nPlantas = nPlantas.replace('.', '*').replace(',', '.').replace('*', ',');
    let stand = (this.lavoura.dadosLavoura.espacamentoHorizontal * this.lavoura.dadosLavoura.espacamentoVertical / 10000).toString();
    stand = stand.replace('.', '*').replace(',', '.').replace('*', ',');
    this.lavoura.dadosLavoura.nPlantas = nPlantas;
    this.lavoura.dadosLavoura.stand = stand;
  }

}
