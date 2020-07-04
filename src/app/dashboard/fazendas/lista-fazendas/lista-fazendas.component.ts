import { Component, OnInit } from '@angular/core';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-fazendas',
  templateUrl: './lista-fazendas.component.html',
  styleUrls: ['./lista-fazendas.component.css']
})
export class ListaFazendasComponent implements OnInit {

  fazendas: any = [];
  constructor(private fazendaService: FazendasService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarFazendas()
  }

  desativarFazenda(idFazenda) {
    this.fazendaService.desativarFazenda(idFazenda)
      .subscribe(response => {
        this.toastr.success('Fazenda excluida');
        this.carregarFazendas();
      })
  }

  carregarFazendas() {
    this.fazendaService.listarFazendas()
      .subscribe(resposta => this.fazendas = resposta);
  }

}
