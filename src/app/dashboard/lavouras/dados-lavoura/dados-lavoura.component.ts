import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-lavoura',
  templateUrl: './dados-lavoura.component.html',
  styleUrls: ['./dados-lavoura.component.css']
})
export class DadosLavouraComponent implements OnInit {
  dadosLavoura: any = {};
  editando = false;
  constructor(private fazendaService: FazendasService, private lavouraService: LavouraService, private alertify: AlertifyService, private router: Router) { }
  @Input() idLavoura: number;
  @Output() salvar = new EventEmitter<number>();
  fazendas: any = [];

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
        });
    });
  }

  avancarEtapa(form) {
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
}
