import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FazendasService } from 'src/app/_services/fazenda.service';
import { StaticService } from 'src/app/_services/static.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fazendaService: FazendasService, private staticService: StaticService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarFazenda();
  }

  avancarEtapa(idNovaFazenda = undefined) {
    this.carregarFazenda(idNovaFazenda);
    this.alterarEtapa(this.etapaAtiva + 1);
  }

  voltarEtapa() {
    this.alterarEtapa(this.etapaAtiva - 1);
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
            if (!this.etapasCarregadas) {
              this.etapaAtiva = this.fazenda.idEtapa;
              this.carregarEtapas();
            }
          }, response => {
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
      });
  }

  concluirCadastro() {
    this.router.navigate(['painel', 'fazendas']);
  }

  alterarEtapa(idEtapa) {
    this.etapaAtiva = idEtapa;
  }
}
