import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { ThrowStmt } from '@angular/compiler';
import { GeometriaService } from 'src/app/_services/geometria.service';

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

  constructor(private fazendaService: FazendasService, private geometriaService: GeometriaService) { }

  ngOnInit(): void {
    this.carregarEtapa();
  }

  carregarEtapa() {
    this.fazendaService.consultarFazendaCompleta(this.idFazenda)
      .subscribe(response => {
        this.fazenda = response;
        this.fazenda.demarcacao = this.geometriaService.montarGeometriaFazenda(this.fazenda.demarcacao);
        this.etapaCarregada = true;
      }, (response) => {
        alert('erro ao carregar');
      });
  }

  confirmarFazenda() {
    if (this.fazenda.concluida) {
      this.confirmar.emit();
      return;
    }
    this.fazendaService.concluirFazenda(this.idFazenda)
      .subscribe(response => {
        alert('fazenda concluida');
        this.confirmar.emit(false);
      }, response => {
        alert(response.error);
      })
  }
}
