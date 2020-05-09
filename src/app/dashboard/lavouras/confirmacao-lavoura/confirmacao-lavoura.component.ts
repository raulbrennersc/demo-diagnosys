import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LavouraService } from 'src/app/_services/lavoura.service';

@Component({
  selector: 'app-confirmacao-lavoura',
  templateUrl: './confirmacao-lavoura.component.html',
  styleUrls: ['./confirmacao-lavoura.component.css']
})
export class ConfirmacaoLavouraComponent implements OnInit {
  @Input() lavoura: any;
  @Output() confirmar = new EventEmitter<boolean>();

  etapaCarregada = false;

  constructor(private lavouraService: LavouraService) { }

  ngOnInit(): void {
    this.carregarEtapa();
  }

  carregarEtapa() {
    this.lavouraService.consultarLavouraCompleta(this.lavoura.id)
      .subscribe(response => {
        this.lavoura = response;
        this.etapaCarregada = true;
      }, (response) => {
        alert('erro ao carregar');
      });
  }

  confirmarLavoura() {
    if (this.lavoura.concluida) {
      this.confirmar.emit();
      return;
    }
    this.lavouraService.concluirLavoura(this.lavoura.id)
      .subscribe(response => {
        alert('lavoura concluida');
        this.confirmar.emit(false);
      }, response => {
        alert(response.error);
      })
  }

}
