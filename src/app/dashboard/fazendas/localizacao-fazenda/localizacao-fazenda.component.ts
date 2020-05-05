import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';

@Component({
  selector: 'app-localizacao-fazenda',
  templateUrl: './localizacao-fazenda.component.html',
  styleUrls: ['./localizacao-fazenda.component.css']
})
export class LocalizacaoFazendaComponent implements OnInit {
  localizacaoFazenda: any = {
    nome: 'teste',
  };
  constructor(private staticService: StaticService) { }
  estados: any = [];
  municipios: any = [];
  ngOnInit(): void {
    this.staticService.listarEstados()
      .subscribe(resposta => this.estados = resposta);
  }

  carregarMunicipios(idEstado) {
    this.staticService.listarMunicipios(idEstado)
      .subscribe(resposta => this.municipios = resposta);
      console.log('caraeasdas');
  }

  
  avancarEtapa(){
    console.log(this.localizacaoFazenda);
  }

}
