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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fazendaService: FazendasService, private staticService: StaticService) { }

  ngOnInit(): void {
    this.carregarFazenda();
  }

  avancarEtapa() {
    this.carregarFazenda();
  }

  carregarFazenda(idNovaFazenda = undefined) {
    console.log(idNovaFazenda);
    if (idNovaFazenda) {
      this.router.navigate(['painel', 'fazendas', 'cadastro', idNovaFazenda]);
    }

    this.activatedRoute.params.subscribe(params => {
      const idFazenda = params['id'];
      if (idFazenda) {
        this.fazendaService.consultarFazenda(idFazenda)
          .subscribe(response => {
            this.fazenda = response;
            this.etapaAtiva = this.fazenda.idEtapa;
          }, response => {
            alert(response.error);
            this.router.navigate(['']);
          });
      }

      this.staticService.listarEtapasFazenda()
        .subscribe(response => {
          this.etapas = response;
        }, response => {
          alert(response.error);
        })
    });
  }

  concluirCadastro() {
    this.router.navigate(['painel', 'fazendas']);
  }

  alterarEtapa(idEtapa) {
    this.etapaAtiva = idEtapa;
  }
}
