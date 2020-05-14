import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { GeometriaService } from 'src/app/_services/geometria.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

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
    quantidadeGeometrias: 1,
    estiloDesenho: { color: this.geometriaService.corFazenda },
  };

  geometria: GeoJSON.Geometry;
  constructor(private fazendaService: FazendasService, private geometriaService: GeometriaService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geometrias) {
    this.geometria = geometrias[0];
  }

  consultarGeometria() {
    if (!this.idFazenda) {
      this.etapaCarregada = true;
      return;
    }

    this.fazendaService.consultarDemarcacaoFazenda(this.idFazenda)
      .subscribe(response => {
        this.editando = true;
        this.geometria = response as GeoJSON.Geometry;
        this.etapaCarregada = true;
      }, response => {
        this.etapaCarregada = true;
      });
  }

  avancarEtapa() {
    if(!this.geometria){
      this.alertify.error('Insira a geometria da fazenda para continuar.')
      return;
    }
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
    this.fazendaService.salvarDemarcacaoFazenda(this.geometria, this.idFazenda)
      .subscribe(callback);
  }

  atualizarDemarcacao(callback) {
    this.fazendaService.atualizarDemarcacaoFazenda(this.geometria, this.idFazenda)
      .subscribe(callback);
  }

}
