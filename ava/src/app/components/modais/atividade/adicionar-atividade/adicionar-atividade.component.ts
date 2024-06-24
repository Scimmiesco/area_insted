import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { InfoModalAddAtividade } from 'app/Interfaces/atividade.interface';
@Component({
  selector: 'app-adicionar-atividade',
  templateUrl: './adicionar-atividade.component.html',
})
export class AdicionarAtividadeComponent implements OnInit {
  AdicionarAtividadeForm!: FormGroup;
  fileName!: string;
  caminhoArquivo!: string;
  dataDaTela!: InfoModalAddAtividade;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InfoModalAddAtividade,
    public dialog: MatDialog
  ) {
    this.dataDaTela = data;
    console.log(this.dataDaTela, 'this.dataDaTela');
  }

  ngOnInit(): void {}
}
