import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';

@Component({
  selector: 'app-demarcacao-lavoura',
  templateUrl: './demarcacao-lavoura.component.html',
  styleUrls: ['./demarcacao-lavoura.component.css']
})
export class DemarcacaoLavouraComponent implements OnInit {
  @Input() idLavoura: number;
  @Output() salvar = new EventEmitter<boolean>();

  etapaCarregada = false;
  editando = false;
  opcoesMapa = {
    polygon: true,
    edit: {},
    remove: {},
  };

  geometria: GeoJSON.Feature<GeoJSON.Polygon>;
  constructor(private lavouraService: LavouraService) { }

  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geo) {
    this.geometria = geo;
  }

  consultarGeometria() {
    if (!this.idLavoura) {
      this.etapaCarregada = true;
      return;
    }

    this.lavouraService.consultarDemarcacaoLavoura(this.idLavoura)
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
    this.lavouraService.salvarDemarcacaoLavoura(this.idLavoura, this.geometria)
      .subscribe(callback);
  }

  atualizarDemarcacao(callback) {
    this.lavouraService.atualizarDemarcacaoLavoura(this.geometria, this.idLavoura)
      .subscribe(callback);
  }

}
