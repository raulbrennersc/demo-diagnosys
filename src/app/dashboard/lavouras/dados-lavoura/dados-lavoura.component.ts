import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dados-lavoura',
  templateUrl: './dados-lavoura.component.html',
  styleUrls: ['./dados-lavoura.component.css']
})
export class DadosLavouraComponent implements OnInit {
  dadosLavoura: any = {
    nPlantas: 0,
    stand: 0,
  };
  constructor(private fazendaService: FazendasService, private lavouraService: LavouraService, private alertify: AlertifyService, private router: Router) { }
  @Input() idLavoura: number;
  @Output() salvar = new EventEmitter<number>();
  fazendas: any = [];

  editando = false;
  formSubmited = false;

  ngOnInit(): void {
    this.fazendaService.listarFazendas().subscribe(fazendas => {
      this.fazendas = fazendas
      if (!this.fazendas || this.fazendas.length == 0) {
        this.alertify.error('É necessário cadastrar uma fazenda antes de cadastrar lavouras!');
        this.router.navigate(['/painel', 'lavouras']);
      }
      this.lavouraService.consultarDadosLavoura(this.idLavoura)
        .subscribe(response => {
          this.editando = true;
          this.dadosLavoura = response;
          this.atualizarValores();
        });
    });
  }

  avancarEtapa(form: NgForm) {
    if (form.invalid) {
      this.formSubmited = true;
      this.alertify.error('Preencha os campos corretamente.');
      return;
    }
    if (this.editando) {
      this.atualizarLocalizacao();
    }
    else {
      this.salvarLocalizacao();
    }
  }

  salvarLocalizacao() {
    this.lavouraService.salvarDadosLavoura(this.dadosLavoura.idFazenda, this.dadosLavoura)
      .subscribe(response => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit((response as any).id);
      });
  }

  atualizarLocalizacao() {
    this.lavouraService.atualizarDadosLavoura(this.idLavoura, this.dadosLavoura)
      .subscribe(response => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit();
      });
  }

  atualizarValores() {
    if (isNaN(this.dadosLavoura.areaTotal) || isNaN(this.dadosLavoura.espacamentoHorizontal) || isNaN(this.dadosLavoura.espacamentoVertical)) {
      this.dadosLavoura.nPlantas = 0;
      this.dadosLavoura.stand = 0;
      return;
    }
    const nLinhas = 100 / this.dadosLavoura.espacamentoHorizontal;
    const nColunas = 100 / this.dadosLavoura.espacamentoVertical;
    const x = (nLinhas * nColunas * this.dadosLavoura.areaTotal);
    const nPlantas = x.toLocaleString('pt-br', {maximumFractionDigits: 0});
    const stand = (x / (this.dadosLavoura.areaTotal * 10000)).toLocaleString('pt-br', {maximumFractionDigits: 5});
    this.dadosLavoura.nPlantas = nPlantas;
    this.dadosLavoura.stand = stand;
  }
}
