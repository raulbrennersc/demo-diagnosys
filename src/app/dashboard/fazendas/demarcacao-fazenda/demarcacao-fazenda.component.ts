import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';

@Component({
  selector: 'app-demarcacao-fazenda',
  templateUrl: './demarcacao-fazenda.component.html',
  styleUrls: ['./demarcacao-fazenda.component.css']
})
export class DemarcacaoFazendaComponent implements OnInit {
  @Input() idFazenda: number;
  @Output() salvar = new EventEmitter<boolean>();

  etapaCarregada = false;
  editando = false;
  opcoesMapa = {
    polygon: true,
    edit: {},
    remove: {},
  };

  geometria: GeoJSON.Feature<GeoJSON.Polygon>;
  constructor(private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geo) {
    this.geometria = geo;
  }

  consultarGeometria() {
    if (!this.idFazenda) {
      this.etapaCarregada = true;
      return;
    }

    this.fazendaService.consultarDemarcacaoFazenda(this.idFazenda)
      .subscribe(response => {
        this.editando = true;
        this.geometria = response as GeoJSON.Feature<GeoJSON.Polygon>;
        this.etapaCarregada = true;
      }, response => {
        this.etapaCarregada = true;
      });
  }

  avancarEtapa() {
    const callback = {
      next: (response) => {
        alert('dadosSalvos');
        this.salvar.emit();
      },
      error: (response) => {
        alert(response.error);
      }
    }

    if (this.editando) {
      this.atualizarDemarcacao(callback);
    }
    else {
      this.salvarDemarcacao(callback);
    }
  }

  salvarDemarcacao(callback) {
    this.fazendaService.salvarDemarcacaoFazenda(this.geometria, this.idFazenda)
      .subscribe(callback);
  }

  atualizarDemarcacao(callback) {
    this.fazendaService.atualizarDemarcacaoFazenda(this.geometria, this.idFazenda)
      .subscribe(callback);
  }

}
