import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-localizacao-fazenda',
  templateUrl: './localizacao-fazenda.component.html',
  styleUrls: ['./localizacao-fazenda.component.css']
})
export class LocalizacaoFazendaComponent implements OnInit {
  localizacaoFazenda: any = {};
  editando = false;
  constructor(private staticService: StaticService, private fazendaService: FazendasService, private alertify: AlertifyService) { }
  @Input() idFazenda: number;
  @Output() salvar = new EventEmitter<number>();
  estados: any = [];
  municipios: any = [];

  ngOnInit(): void {
    this.staticService.listarEstados()
      .subscribe(response => this.estados = response);
    if (this.idFazenda) {
      this.fazendaService.consultarLocalizacaoFazenda(this.idFazenda)
        .subscribe(response => {
          this.editando = true;
          this.localizacaoFazenda = response;
          this.carregarMunicipios(this.localizacaoFazenda.idEstado);
        });
    }
  }

  carregarMunicipios(idEstado) {
    this.staticService.listarMunicipios(idEstado)
      .subscribe(response => this.municipios = response);
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
    this.fazendaService.salvarLocalizacaoFazenda(this.localizacaoFazenda)
      .subscribe(response => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit((response as any).id);
      });
  }

  atualizarLocalizacao() {
    this.fazendaService.atualizarLocalizacaoFazenda(this.localizacaoFazenda, this.idFazenda)
      .subscribe(response => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit();
      });
  }

}
