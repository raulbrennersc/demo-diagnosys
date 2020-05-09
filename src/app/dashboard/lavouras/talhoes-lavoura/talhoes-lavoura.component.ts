import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { FazendasService } from 'src/app/_services/fazenda.service';

@Component({
  selector: 'app-talhoes-lavoura',
  templateUrl: './talhoes-lavoura.component.html',
  styleUrls: ['./talhoes-lavoura.component.css']
})
export class TalhoesLavouraComponent implements OnInit {
  @Input() lavoura: any;
  @Output() salvar = new EventEmitter<boolean>();

  etapaCarregada = false;
  editando = false;
  opcoesMapa = {
    polygon: true,
    edit: {},
    remove: {},
  };

  geometrias: GeoJSON.FeatureCollection;
  geometriasFixas: GeoJSON.Geometry[] = new Array<GeoJSON.Geometry>();
  constructor(private lavouraService: LavouraService, private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geometrias) {
    this.geometrias = geometrias;
  }

  consultarGeometria() {
    this.lavouraService.consultarTalhoesLavoura(this.lavoura.id)
      .subscribe(response => {
        this.editando = true;
        this.geometrias = response as GeoJSON.FeatureCollection;
        this.carregarGeometriasFixas();
      }, response => {
        this.carregarGeometriasFixas();
      });
  }

  carregarGeometriasFixas() {
    this.fazendaService.consultarDemarcacaoFazenda(this.lavoura.idFazenda).subscribe(responseFazenda => {
      this.geometriasFixas.push(responseFazenda as GeoJSON.Geometry);
      this.lavouraService.consultarDemarcacaoLavoura(this.lavoura.id).subscribe(responseLavoura => {
        this.geometriasFixas.push(responseLavoura as GeoJSON.Geometry);
        this.etapaCarregada = true;
      });
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
      this.atualizarTalhoes(callback);
    }
    else {
      this.salvarTalhoes(callback);
    }
  }

  salvarTalhoes(callback) {
    this.lavouraService.salvarTalhoesLavoura(this.lavoura.id, this.geometrias)
      .subscribe(callback);
  }

  atualizarTalhoes(callback) {
    this.lavouraService.atualizarTalhoesLavoura(this.lavoura.id, this.geometrias)
      .subscribe(callback);
  }

}
