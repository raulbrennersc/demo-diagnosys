import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LavouraService } from 'src/app/_services/lavoura.service';
import { StaticService } from 'src/app/_services/static.service';

@Component({
  selector: 'app-cadastro-lavoura',
  templateUrl: './cadastro-lavoura.component.html',
  styleUrls: ['./cadastro-lavoura.component.css']
})
export class CadastroLavouraComponent implements OnInit {

  lavoura: any = { idEtapa: 1 };
  etapas: any = [];
  etapaAtiva = 1;
  etapasCarregadas = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private lavouraService: LavouraService, private staticService: StaticService) { }

  ngOnInit() {
    this.carregarLavoura();
  }

  avancarEtapa(idNovaLavoura = undefined) {
    this.carregarLavoura(idNovaLavoura);
    this.alterarEtapa(this.etapaAtiva + 1);
  }

  carregarLavoura(idNovaLavoura = undefined) {
    if (idNovaLavoura) {
      this.router.navigate(['painel', 'lavouras', 'cadastro', idNovaLavoura]);
      return;
    }

    this.activatedRoute.params.subscribe(params => {
      const idLavoura = params['id'];
      if (idLavoura) {
        this.lavouraService.consultarLavoura(idLavoura)
          .subscribe(response => {
            this.lavoura = response;
            if (!this.etapasCarregadas) {
              this.etapaAtiva = this.lavoura.idEtapa;
              this.carregarEtapas();
            }
          }, response => {
            alert(response.error);
            this.router.navigate(['']);
          });
      }
      else {
        this.carregarEtapas();
      }
    });
  }

  carregarEtapas() {
    this.staticService.listarEtapasLavoura()
      .subscribe(response => {
        this.etapas = response;
        this.etapasCarregadas = true;
      }, response => {
        alert(response.error);
      });
  }

  concluirCadastro() {
    this.router.navigate(['painel', 'lavouras']);
  }

  alterarEtapa(idEtapa) {
    this.etapaAtiva = idEtapa;
  }

}
