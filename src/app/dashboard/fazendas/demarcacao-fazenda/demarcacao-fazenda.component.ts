import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-demarcacao-fazenda',
  templateUrl: './demarcacao-fazenda.component.html',
  styleUrls: ['./demarcacao-fazenda.component.css']
})
export class DemarcacaoFazendaComponent implements OnInit {
  @Input() idFazenda: number;
  @Output() avancarEtapa = new EventEmitter<Function>();
  constructor() { }
  
  ngOnInit(): void {
    this.avancarEtapa.emit(this.avancarFunc);
  }
  
  avancarFunc(){
    alert('salvando demarcacao');
  }
  
}