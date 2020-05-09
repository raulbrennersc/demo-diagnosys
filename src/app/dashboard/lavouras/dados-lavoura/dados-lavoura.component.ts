import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';
import { LavouraService } from 'src/app/_services/lavoura.service';

@Component({
  selector: 'app-dados-lavoura',
  templateUrl: './dados-lavoura.component.html',
  styleUrls: ['./dados-lavoura.component.css']
})
export class DadosLavouraComponent implements OnInit {
  dadosLavoura: any = {};
  editando = false;
  constructor(private staticService: StaticService, private lavouraService: LavouraService) { }
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
        alert('dadosSalvos');
        this.salvar.emit((response as any).id);
      }, response => {
        alert(response.error);
      });
  }

  atualizarLocalizacao() {
    this.lavouraService.atualizarDadosLavoura(this.dadosLavoura, this.idLavoura)
      .subscribe(response => {
        alert('dadosSalvos');
        this.salvar.emit();
      }, response => {
        alert(response.error);
      });
  }
}
