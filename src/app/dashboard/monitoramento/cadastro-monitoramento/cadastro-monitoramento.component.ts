import { Component, OnInit } from '@angular/core';
import { MonitoramentoService } from 'src/app/_services/monitoramento.service';
import { GeometriaService } from 'src/app/_services/geometria.service';

@Component({
  selector: 'app-cadastro-monitoramento',
  templateUrl: './cadastro-monitoramento.component.html',
  styleUrls: ['./cadastro-monitoramento.component.css']
})
export class CadastroMonitoramentoComponent implements OnInit {
  idFazenda = 0;
  fazendasCarregadas = false;
  geometriasCarregadas= false;
  fazendas: any = [];
  geometrias: GeoJSON.Geometry[];
  dataPdi: any;
  urlPdi = '';

  constructor(private monitoramentoService: MonitoramentoService, private geometriaService: GeometriaService) { }
  
  ngOnInit(): void {
    this.monitoramentoService.listarFazendasMonitoramento().subscribe(response => {
      this.fazendas = response;
      this.fazendasCarregadas = true;
    })
  }

  carregarDadosFazenda(idFazenda){
    this.monitoramentoService.consultarMonitoramentoFazenda(idFazenda)
    .subscribe(response =>{
      const x = response as any;
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

      this.geometriasCarregadas = true;
    });
  }

}
