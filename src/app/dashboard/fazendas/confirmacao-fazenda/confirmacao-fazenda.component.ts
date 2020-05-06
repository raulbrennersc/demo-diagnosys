import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-confirmacao-fazenda',
  templateUrl: './confirmacao-fazenda.component.html',
  styleUrls: ['./confirmacao-fazenda.component.css']
})
export class ConfirmacaoFazendaComponent implements OnInit {
  @Input() idFazenda: number;
  @Output() confirmar = new EventEmitter<boolean>();

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
        alert('erro ao carregar');
      });
  }

  confirmarFazenda(){
    this.fazendaService.concluirFazenda(this.idFazenda)
    .subscribe(response => {
      alert('fazenda concluida');
      this.confirmar.emit(false);
    }, response => {
      alert(response.error);
    })
  }

}
