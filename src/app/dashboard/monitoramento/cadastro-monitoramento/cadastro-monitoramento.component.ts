import { Component, OnInit } from '@angular/core';
import { MonitoramentoService } from 'src/app/_services/monitoramento.service';

@Component({
  selector: 'app-cadastro-monitoramento',
  templateUrl: './cadastro-monitoramento.component.html',
  styleUrls: ['./cadastro-monitoramento.component.css']
})
export class CadastroMonitoramentoComponent implements OnInit {
  idFazenda = 0;
  fazendasCarregadas = false;
  fazendas: any = [];

  constructor(private monitoramentoService: MonitoramentoService) { }
  
  ngOnInit(): void {
    this.monitoramentoService.listarFazendasMonitoramento().subscribe(response => {
      this.fazendas = response;
      this.fazendasCarregadas = true;
    })
  }

  carregarDadosFazenda(idFazenda){

  }

}
