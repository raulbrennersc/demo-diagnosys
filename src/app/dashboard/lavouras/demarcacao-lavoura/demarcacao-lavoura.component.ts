import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-demarcacao-lavoura',
  templateUrl: './demarcacao-lavoura.component.html',
  styleUrls: ['./demarcacao-lavoura.component.css']
})
export class DemarcacaoLavouraComponent implements OnInit {
  @Input() idLavoura: number;
  constructor() { }

  ngOnInit(): void {
  }

}
