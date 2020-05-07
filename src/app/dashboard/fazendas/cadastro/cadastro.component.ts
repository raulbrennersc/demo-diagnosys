import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { StaticService } from 'src/app/_services/static.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  fazenda: any = { idEtapa: 1 };
  etapas: any = [];
  etapaAtiva = 1;
  etapasCarregadas = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fazendaService: FazendasService, private staticService: StaticService) { }

  ngOnInit(): void {
    this.carregarFazenda();
  }

  avancarEtapa() {
    this.carregarFazenda();
  }

  carregarFazenda(idNovaFazenda = undefined) {
    if (idNovaFazenda) {
      this.router.navigate(['painel', 'fazendas', 'cadastro', idNovaFazenda]);
      return;
    }

    this.activatedRoute.params.subscribe(params => {
      const idFazenda = params['id'];
      if (idFazenda) {
        this.fazendaService.consultarFazenda(idFazenda)
          .subscribe(response => {
            this.fazenda = response;
            this.etapaAtiva = this.fazenda.idEtapa;
            if (!this.etapasCarregadas)
              this.carregarEtapas();
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
    this.staticService.listarEtapasFazenda()
      .subscribe(response => {
        this.etapas = response;
        this.etapasCarregadas = true;
      }, response => {
        alert(response.error);
      });
  }

  concluirCadastro() {
    this.router.navigate(['painel', 'fazendas']);
  }

  alterarEtapa(idEtapa) {
    this.etapaAtiva = idEtapa;
  }
}
