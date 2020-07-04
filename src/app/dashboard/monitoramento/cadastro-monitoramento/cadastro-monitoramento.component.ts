import { Component, OnInit } from '@angular/core';
import { MonitoramentoService } from 'src/app/_services/monitoramento.service';
import { GeometriaService } from 'src/app/_services/geometria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-cadastro-monitoramento',
  templateUrl: './cadastro-monitoramento.component.html',
  styleUrls: ['./cadastro-monitoramento.component.css']
})
export class CadastroMonitoramentoComponent implements OnInit {
  idFazenda = 0;
  idMonitoramento = 0;
  idProblema = 1;
  visualizando = false;
  fazendasCarregadas = false;
  geometriasCarregadas = false;
  fazendas: any = [];
  geometrias: GeoJSON.Geometry[];
  dataPdi: any;
  urlPdi = '';
  problemas = [];

  opcoesMapa = {
    marker: true
  };

  constructor(private activatedRoute: ActivatedRoute, private monitoramentoService: MonitoramentoService, private geometriaService: GeometriaService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.monitoramentoService.listarFazendasMonitoramento().subscribe(response => {
      this.fazendas = response;
      this.fazendasCarregadas = true;
      this.activatedRoute.params.subscribe(params => {
        const idMonitoramento = params['id'];
        if (idMonitoramento) {
          this.idMonitoramento = idMonitoramento;
          this.visualizando = true;
          this.opcoesMapa.marker = false;
          this.carregarMonitoramento();
        }
      });
    })
  }

  carregarDadosFazenda(idFazenda) {
    this.geometriasCarregadas = false;
    this.idFazenda = idFazenda;
    this.monitoramentoService.consultarMonitoramentoFazenda(this.idFazenda)
      .subscribe(response => {
        this.montarMonitoramento(response);
        this.urlPdi = (response as any).urlPdi;
      });
  }

  carregarMonitoramento() {
    this.monitoramentoService.consultarMonitoramento(this.idMonitoramento)
      .subscribe(response => {
        this.montarMonitoramento(response);
      });
  }

  montarMonitoramento(x: any) {
    this.dataPdi = x.dataImagemPdi;
    this.urlPdi = x.urlPdi;
    this.geometrias = new Array<GeoJSON.Geometry>();
    this.geometrias.push(this.geometriaService.montarGeometriaFazenda(x.demarcacaoFazenda));
    x.demarcacoesLavoura.map(l => this.geometriaService.montarGeometriaLavoura(l)).forEach(l => {
      this.geometrias.push(l);
    });
    x.demarcacoesTalhao.map(t => this.geometriaService.montarGeometriaTalhao(t)).forEach(t => {
      this.geometrias.push(t);
    });

    if (x.problemas) {
      x.problemas.forEach(problema => {
        problema.nome = 'Ponto ' + (this.problemas.length + 1);
        this.problemas.push(problema);
        this.geometrias.push(problema.ponto);
      });
    }

    if (x.idFazenda) {
      this.idFazenda = x.idFazenda;
    }
    this.geometriasCarregadas = true;
  }

  salvarGeometria(geo) {
    const problema = {
      id: this.idProblema,
      ponto: geo,
      nome: 'Ponto ' + this.idProblema,
      descricao: 'Digite aqui...',
      recomendacao: 'Digite aqui...',
    }
    this.idProblema++;
    this.problemas.push(problema);
    this.geometrias.push(geo);
  }

  excluirProblema(problema) {
    this.geometrias = this.geometrias.filter(g => g != problema.ponto);
    this.problemas = this.problemas.filter(p => p != problema);
  }

  salvarMonitoramento() {
    const monitoramento = {
      idFazenda: this.idFazenda,
      problemas: this.problemas
    };

    this.monitoramentoService.salvarMonitoramento(monitoramento)
      .subscribe(response => {
        this.alertify.success('Monitoramento realizado com sucesso!');
        this.router.navigate(['/painel', 'monitoramento']);
      });
  }

}
