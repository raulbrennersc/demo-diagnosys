import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmacao-lavoura',
  templateUrl: './confirmacao-lavoura.component.html',
  styleUrls: ['./confirmacao-lavoura.component.css']
})
export class ConfirmacaoLavouraComponent implements OnInit {
  @Input() idLavoura: number;
  constructor() { }

  ngOnInit(): void {
  }

}
