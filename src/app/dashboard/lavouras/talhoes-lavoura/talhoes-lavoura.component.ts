import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';

@Component({
  selector: 'app-talhoes-lavoura',
  templateUrl: './talhoes-lavoura.component.html',
  styleUrls: ['./talhoes-lavoura.component.css']
})
export class TalhoesLavouraComponent implements OnInit {
  @Input() idLavoura: number;
  @Output() salvar = new EventEmitter<boolean>();

  etapaCarregada = false;
  editando = false;
  opcoesMapa = {
    polygon: true,
    edit: {},
    remove: {},
  };

  geometrias: GeoJSON.FeatureCollection;
  constructor(private lavouraService: LavouraService) { }

  ngOnInit(): void {
    this.consultarGeometria();
  }

  salvarGeometria(geometrias) {
    this.geometrias = geometrias;
  }

  consultarGeometria() {
    if (!this.idLavoura) {
      this.etapaCarregada = true;
      return;
    }

    this.lavouraService.consultarTalhoesLavoura(this.idLavoura)
      .subscribe(response => {
        this.editando = true;
        this.geometrias = response as GeoJSON.FeatureCollection;
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
      this.atualizarTalhoes(callback);
    }
    else {
      this.salvarTalhoes(callback);
    }
  }

  salvarTalhoes(callback) {
    this.lavouraService.salvarTalhoesLavoura(this.idLavoura, this.geometrias)
      .subscribe(callback);
  }

  atualizarTalhoes(callback) {
    this.lavouraService.atualizarTalhoesLavoura(this.idLavoura, this.geometrias)
      .subscribe(callback);
  }

}
