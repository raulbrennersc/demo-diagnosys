import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  
  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }
  
  ngOnInit(): void {
    this.user.name = this.autenticacaoService.decodedToken.unique_name;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
