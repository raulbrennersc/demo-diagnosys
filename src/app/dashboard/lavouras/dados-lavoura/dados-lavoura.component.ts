import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-dados-lavoura',
  templateUrl: './dados-lavoura.component.html',
  styleUrls: ['./dados-lavoura.component.css']
})
export class DadosLavouraComponent implements OnInit {
  dadosLavoura: any = {};
  editando = false;
  constructor(private staticService: StaticService, private lavouraService: LavouraService, private alertify: AlertifyService) { }
  @Input() idLavoura: number;
  @Output() salvar = new EventEmitter<number>();
  estados: any = [];
  municipios: any = [];

  ngOnInit(): void {
    this.staticService.listarEstados()
      .subscribe(response => this.estados = response);
    if (this.idLavoura) {
      this.lavouraService.consultarDadosLavoura(this.idLavoura)
        .subscribe(response => {
          this.editando = true;
          this.dadosLavoura = response;
        });
    }
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
    this.lavouraService.salvarDadosLavoura(this.lavouraService.fazendaAtual, this.dadosLavoura)
      .subscribe(response => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit((response as any).id);
      });
  }

  atualizarLocalizacao() {
    this.lavouraService.atualizarDadosLavoura(this.dadosLavoura, this.idLavoura)
      .subscribe(response => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit();
      });
  }
}
