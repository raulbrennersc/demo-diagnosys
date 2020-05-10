import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { GeometriaService } from 'src/app/_services/geometria.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

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
    quantidadeGeometrias: 1,
    estiloDesenho: { color: this.geometriaService.corLavoura },
  };

  geometria: GeoJSON.Geometry;
  geometriaFazenda: GeoJSON.Geometry;
  constructor(private lavouraService: LavouraService, private fazendaService: FazendasService, private geometriaService: GeometriaService, private alertify: AlertifyService) { }

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
    this.fazendaService.consultarDemarcacaoFazenda(this.lavoura.idFazenda).subscribe(response => {
      this.geometriaFazenda = this.geometriaService.montarGeometriaFazenda(response);
      this.etapaCarregada = true;
    });
  }

  avancarEtapa() {
    const callback = {
      next: (response) => {
        this.alertify.success('Dados salvos!');
        this.salvar.emit();
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
