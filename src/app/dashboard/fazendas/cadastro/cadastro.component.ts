import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  fazenda: any = {
    nome: 'asdasdasda'
  };
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  avancarEtapa () {
    console.log('erro');
  } 
}
