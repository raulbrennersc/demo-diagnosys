import { Component, OnInit, Input } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';
import { FazendasService } from 'src/app/_services/fazenda.service';

@Component({
  selector: 'app-dados-fazenda',
  templateUrl: './dados-fazenda.component.html',
  styleUrls: ['./dados-fazenda.component.css']
})
export class DadosFazendaComponent implements OnInit {
  @Input() idFazenda: number;
  dadosFazenda: any = {};
  culturas: any = [];

  constructor(private staticService: StaticService, private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.staticService.listarCulturas()
      .subscribe(resposta => this.culturas = resposta);
  }

  avancarEtapa(form){
    this.fazendaService.salvarDadosFazenda(this.dadosFazenda, this.idFazenda)
    .subscribe(response => {
      console.log(response);
      alert('dadosSalvos')
    }, response => {
      console.log(response.error);
      alert(response.error);
    });
  }
}
