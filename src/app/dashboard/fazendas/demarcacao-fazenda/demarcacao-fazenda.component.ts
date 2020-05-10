import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { GeometriaService } from 'src/app/_services/geometria.service';

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
  constructor(private fazendaService: FazendasService, private geometriaService: GeometriaService) { }

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
