import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticService } from 'src/app/_services/static.service';
import { FazendasService } from 'src/app/_services/fazenda.service';

@Component({
  selector: 'app-dados-fazenda',
  templateUrl: './dados-fazenda.component.html',
  styleUrls: ['./dados-fazenda.component.css']
})
export class DadosFazendaComponent implements OnInit {
  @Input() idFazenda: number;
  @Output() salvar = new EventEmitter<any>();
  editando = false;
  dadosFazenda: any = {};
  culturas: any = [];

  constructor(private staticService: StaticService, private fazendaService: FazendasService) { }

  ngOnInit(): void {
    this.staticService.listarCulturas()
      .subscribe(resposta => this.culturas = resposta);
    if (this.idFazenda) {
      this.fazendaService.consultarDadosFazenda(this.idFazenda)
        .subscribe(response => {
          this.editando = true;
          this.dadosFazenda = response;
        }, response => {
          console.log(response.error);
        });
    }
  }

  avancarEtapa(form) {
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
      this.atualizarDados(callback);
    }
    else {
      this.salvarDados(callback);
    }
  }

  salvarDados(callback) {
    this.fazendaService.salvarDadosFazenda(this.dadosFazenda, this.idFazenda)
      .subscribe(callback);
  }

  atualizarDados(callback) {
    this.fazendaService.atualizarDadosFazenda(this.dadosFazenda, this.idFazenda)
      .subscribe(callback);
  }
}
