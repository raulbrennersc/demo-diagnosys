import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FazendasService } from 'src/app/_services/fazenda.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  fazenda: any = {};
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fazendaService: FazendasService) { }
  
  ngOnInit(): void {
    this.carregarFazenda();
  }

  avancarEtapa () {
    this.carregarFazenda();
  }

  carregarFazenda(idNovaFazenda = undefined){
    if(idNovaFazenda){
      this.router.navigate(['painel', 'fazendas', 'cadastro', idNovaFazenda]);
    }

    this.activatedRoute.params.subscribe(params => {
      const idFazenda = params['id'];
      if(idFazenda){
        this.fazendaService.consultarFazenda(idFazenda)
        .subscribe(response => {
          this.fazenda = response;
        }, response => {
          alert(response.error);
          this.router.navigate(['']);
        });
      }
    });
  }

  concluirCadastro(){
    this.router.navigate(['painel', 'fazendas']);
  }
}
