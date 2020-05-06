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

  geometria: GeoJSON.Feature<GeoJSON.Polygon>;
  constructor(private fazendaService: FazendasService) { }
  
  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geo){
    this.geometria = geo;
  }
  
  avancarEtapa(){
    this.fazendaService.salvarDemarcacaoFazenda(this.geometria, this.idFazenda)
    .subscribe(response => {
      alert('dados salvos');
      this.salvar.emit(true);
    }, response => {
      alert(response.error);
    });
  }

  consultarGeometria () {
    console.log('consultando');
    if(!this.idFazenda){
      this.etapaCarregada = true;
      return;
    }

    this.fazendaService.consultarDemarcacaoFazenda(this.idFazenda)
      .subscribe(x => {
        this.geometria = x as GeoJSON.Feature<GeoJSON.Polygon>;
        this.etapaCarregada = true;
        console.log('damarcacao', this.geometria);
      }, x => {
        this.etapaCarregada = true;
      });
  }
  
}
