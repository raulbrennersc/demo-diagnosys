import { Component, OnInit, Input } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-confirmacao-fazenda',
  templateUrl: './confirmacao-fazenda.component.html',
  styleUrls: ['./confirmacao-fazenda.component.css']
})
export class ConfirmacaoFazendaComponent implements OnInit {
  @Input() idFazenda: number;

  fazenda: any;
  etapaCarregada = false;

  constructor(private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.carregarEtapa();
  }

  carregarEtapa(){
    this.fazendaService.consultarFazendaCompleta(this.idFazenda)
    .subscribe( response => {
        this.fazenda = response;

        console.log(this.fazenda.demarcacao);
        console.log(this.fazenda);
        this.etapaCarregada = true;
      }, (response) => {
        console.log('erro');
      });
  }

}
