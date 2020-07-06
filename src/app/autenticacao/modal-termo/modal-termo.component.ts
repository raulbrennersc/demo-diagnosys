import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-termo',
  templateUrl: './modal-termo.component.html',
  styleUrls: ['./modal-termo.component.css']
})
export class ModalTermoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalTermoComponent>, private autenticacaoService: AutenticacaoService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }
  showButton = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.showButton = true;
    }, 500);
  }

  aceitarTermo() {
    this.autenticacaoService.aceitaTermo(this.data).subscribe(data => {
      this.dialogRef.close({success: true});  
    }, data => {
      this.toastr.error(data.error.message);
      this.dialogRef.close({sucesess: false});
    });
  }

}
