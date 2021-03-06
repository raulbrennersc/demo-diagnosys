import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { ThrowStmt } from '@angular/compiler';
import { GeometriaService } from 'src/app/_services/geometria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmacao-fazenda',
  templateUrl: './confirmacao-fazenda.component.html',
  styleUrls: ['./confirmacao-fazenda.component.css']
})
export class ConfirmacaoFazendaComponent implements OnInit {
  @Input() idFazenda: number;
  @Output() confirmar = new EventEmitter<boolean>();
  @Output() voltar = new EventEmitter<boolean>();

  fazenda: any;
  etapaCarregada = false;

  constructor(private fazendaService: FazendasService, private geometriaService: GeometriaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarEtapa();
  }

  carregarEtapa() {
    this.fazendaService.consultarFazendaCompleta(this.idFazenda)
      .subscribe(response => {
        this.fazenda = response;
        this.fazenda.demarcacao = this.geometriaService.montarGeometriaFazenda(this.fazenda.demarcacao);
        this.etapaCarregada = true;
      });
  }

  confirmarFazenda() {
    if (this.fazenda.concluida) {
      this.confirmar.emit();
      return;
    }
    this.fazendaService.concluirFazenda(this.idFazenda)
      .subscribe(response => {
        this.toastr.success('Cadastro da fazenda concluído');
        this.confirmar.emit(false);
      })
  }

  voltarEtapa() {
    this.voltar.emit(true);
  }
}
