import { Component, OnInit } from '@angular/core';
import { MonitoramentoService } from 'src/app/_services/monitoramento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-monitoramento',
  templateUrl: './lista-monitoramento.component.html',
  styleUrls: ['./lista-monitoramento.component.css']
})
export class ListaMonitoramentoComponent implements OnInit {
  monitoramentosCarregados = false;
  monitoramentos: any = [];
  idFazenda = 0;
  podeCadastrar = false;

  constructor(private monitoramentoService: MonitoramentoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idFazenda = params['id'];
      if (this.idFazenda) {
        this.carregarMonitoramentosPorFazenda()
      }
      else {
        this.carregarMonitoramentosPorUsuario();
      }
    });
  }

  carregarMonitoramentosPorFazenda() {
    this.monitoramentoService.listarPorFazenda(this.idFazenda)
      .subscribe(response => {
        this.monitoramentos = response;
        this.monitoramentosCarregados = true;
      });
  }

  carregarMonitoramentosPorUsuario() {
    this.monitoramentoService.listarTodos()
      .subscribe(response => {
        this.monitoramentos = response;
        this.monitoramentosCarregados = true;
      });
  }

  excluirMonitoramento(idMonitoramento) {
    this.monitoramentoService.excluirMonitoramento(idMonitoramento)
      .subscribe(response => {
        if (this.idFazenda) {
          this.carregarMonitoramentosPorFazenda();
        }
        else {
          this.carregarMonitoramentosPorUsuario();
        }
      })
  }

}
