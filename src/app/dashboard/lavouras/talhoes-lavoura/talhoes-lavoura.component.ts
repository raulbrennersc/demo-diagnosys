import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { GeometriaService } from 'src/app/_services/geometria.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

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
    estiloDesenho: { color: this.geometriaService.corTalhao },
  };

  geometrias: GeoJSON.Geometry[];
  geometriasFixas: GeoJSON.Geometry[] = new Array<GeoJSON.Geometry>();
  constructor(private lavouraService: LavouraService, private fazendaService: FazendasService, private geometriaService: GeometriaService, private alertify: AlertifyService) { }

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
        this.geometrias = response as GeoJSON.Geometry[];
        this.carregarGeometriasFixas();
      }, response => {
        this.carregarGeometriasFixas();
      });
  }

  carregarGeometriasFixas() {
    this.fazendaService.consultarDemarcacaoFazenda(this.lavoura.idFazenda).subscribe(responseFazenda => {
      this.geometriasFixas.push(this.geometriaService.montarGeometriaFazenda(responseFazenda));
      this.lavouraService.consultarDemarcacaoLavoura(this.lavoura.id).subscribe(responseLavoura => {
        this.geometriasFixas.push(this.geometriaService.montarGeometriaLavoura(responseLavoura));
        this.etapaCarregada = true;
      });
    });
  }

  avancarEtapa() {
    const callback = {
      next: (response) => {
        this.alertify.success('Dados Salvos!');
        this.salvar.emit();
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
