import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-demarcacao-lavoura',
  templateUrl: './demarcacao-lavoura.component.html',
  styleUrls: ['./demarcacao-lavoura.component.css']
})
export class DemarcacaoLavouraComponent implements OnInit {
  @Input() lavoura: any;
  @Output() salvar = new EventEmitter<boolean>();

  etapaCarregada = false;
  editando = false;
  opcoesMapa = {
    polygon: true,
    edit: {},
    remove: {},
  };

  geometria: GeoJSON.Geometry;
  geometriaFazenda: GeoJSON.Geometry;
  constructor(private lavouraService: LavouraService, private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geometrias) {
    this.geometria = geometrias[0];
  }

  consultarGeometria() {
    this.lavouraService.consultarDemarcacaoLavoura(this.lavoura.id)
      .subscribe(response => {
        this.editando = true;
        this.geometria = response as GeoJSON.Geometry;
        this.carregarGeometriaFazenda();
      }, response => {
        this.carregarGeometriaFazenda();
      });
  }

  carregarGeometriaFazenda() {
    this.fazendaService.consultarDemarcacaoFazenda(this.lavoura.idFazenda).subscribe(responseFazenda => {
      let geoFazenda = responseFazenda as any;
      geoFazenda.style = { color: '#a9cf74' };
      this.geometriaFazenda = geoFazenda as GeoJSON.Geometry;
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
    this.lavouraService.salvarDemarcacaoLavoura(this.lavoura.id, this.geometria)
      .subscribe(callback);
  }

  atualizarDemarcacao(callback) {
    this.lavouraService.atualizarDemarcacaoLavoura(this.geometria, this.lavoura.id)
      .subscribe(callback);
  }

}
