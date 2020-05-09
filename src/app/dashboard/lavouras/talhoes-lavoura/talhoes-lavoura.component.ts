import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-talhoes-lavoura',
  templateUrl: './talhoes-lavoura.component.html',
  styleUrls: ['./talhoes-lavoura.component.css']
})
export class TalhoesLavouraComponent implements OnInit {
  @Input() idLavoura: number;
  constructor() { }

  ngOnInit(): void {
  }

}
