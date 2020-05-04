import { Component, OnInit } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';

@Component({
  selector: 'app-dados-fazenda',
  templateUrl: './dados-fazenda.component.html',
  styleUrls: ['./dados-fazenda.component.css']
})
export class DadosFazendaComponent implements OnInit {
  dadosFazenda: any = {};
  culturas: any = [];

  constructor(private staticService: StaticService) { }

  ngOnInit(): void {
    this.staticService.listarCulturas()
      .subscribe(resposta => this.culturas = resposta);
  }
}
