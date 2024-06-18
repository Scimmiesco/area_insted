import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../calendar/calendar.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { register } from 'swiper/element/bundle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IAtividadeFormulario } from 'app/Interfaces/atividade.interface';
import { AtividadesService } from 'app/services/atividades.service';
import { RetornoRequisicaoModalComponent } from '../retornoRequisicao/retornoRequisicao.component';
export interface TipoAtividade {
  TipoID: number;
  nomeTipo: string;
}
interface InfoModalAddAtividade {
  MateriaID: number;
  UsuarioID: number;
}
@Component({
  selector: 'app-adicionar-atividade',
  templateUrl: './adicionar-atividade.component.html',
})
export class AdicionarAtividadeComponent implements OnInit {
  AdicionarAtividadeForm!: FormGroup;

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    menubar: false,
    hidden_input: false,
    statusbar: false,
    placeholder: 'Insira o conteúdo aqui...',
    toolbar: [
      { name: 'history', items: ['undo', 'redo'] },
      { name: 'styles', items: ['styles'] },
      { name: 'formatting', items: ['bold', 'italic'] },
      {
        name: 'alignment',
        items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'],
      },
      { name: 'indentation', items: ['outdent', 'indent'] },
      { name: 'save', items: ['save'] },
    ],
  };

  selectTipoAtividade: TipoAtividade[] = [
    {
      TipoID: 1,
      nomeTipo: 'Texto',
    },
    {
      TipoID: 2,
      nomeTipo: 'Página',
    },
    {
      TipoID: 3,
      nomeTipo: 'Arquivo',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InfoModalAddAtividade,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private atividadeServive: AtividadesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.AdicionarAtividadeForm = this.formBuilder.group({
      TituloAtividade: ['', Validators.required],
      TipoAtividade: ['', Validators.required],
      Situacao: ['', Validators.required],
      DataInicioData: ['', Validators.required],
      DataInicioHora: ['', Validators.required],
      DataFimData: ['', Validators.required],
      DataFimHora: ['', Validators.required],
      ConteudoAtividade: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.AdicionarAtividadeForm.invalid) {
      return;
    }
    const formData: IAtividadeFormulario = {
      Nome: this.AdicionarAtividadeForm.value.TituloAtividade,
      TipoAtividadeID: parseInt(
        this.AdicionarAtividadeForm.value.TipoAtividade
      ),
      Situacao: this.AdicionarAtividadeForm.value.Situacao,
      PrazoInicial: this.FormatarData(
        this.AdicionarAtividadeForm.value.DataInicioData,
        this.AdicionarAtividadeForm.value.DataInicioHora
      ),
      PrazoFinal: this.FormatarData(
        this.AdicionarAtividadeForm.value.DataFimData,
        this.AdicionarAtividadeForm.value.DataFimHora
      ),
      Conteudo: this.AdicionarAtividadeForm.value.ConteudoAtividade,
      MateriaID: this.data.MateriaID,
      UsuarioID: this.data.UsuarioID,
    };

    this.atividadeServive.AdicionarAtividade(formData).subscribe({
      next: (response) => {
        this.modalSucesso('Sucesso ao criar atividade');
        this.AdicionarAtividadeForm.reset();
      },
      error: (error) => {
        console.error('Unexpected error:', error);
        this.modalErro(
          'Erro desconhecido. Por favor, tente novamente mais tarde.'
        );
      },
    });
  }

  FormatarData(dateString: string, timeString: string): string {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':').map(Number);

    if (isNaN(date.getTime()) || isNaN(hours) || isNaN(minutes)) {
      return '';
    }

    date.setHours(hours);
    date.setMinutes(minutes);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:${seconds}`;
  }

  modalSucesso(message: string) {
    this.dialog.open(RetornoRequisicaoModalComponent, {
      data: { message: message, tipoModal: 'sucesso' },
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'sucesso',
    });
  }

  modalErro(message: string) {
    this.dialog.open(RetornoRequisicaoModalComponent, {
      data: { message: message, tipoModal: 'sucesso' },
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'sucesso',
    });
  }
}
