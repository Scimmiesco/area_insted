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
    plugins: 'save',
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
    save_onsavecallback: () => {
      this.onSubmit();
    },
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
    private atividadeServive: AtividadesService
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
      console.error('Form is invalid!');
    }
    const formData: IAtividadeFormulario = {
      Nome: this.AdicionarAtividadeForm.value.TituloAtividade,
      TipoAtividadeID: parseInt(
        this.AdicionarAtividadeForm.value.TipoAtividade
      ),
      Situacao: this.AdicionarAtividadeForm.value.Situacao,
      PrazoInicial: this.formatDate(
        this.AdicionarAtividadeForm.value.DataInicioData,
        this.AdicionarAtividadeForm.value.DataInicioHora
      ),
      PrazoFinal: this.formatDate(
        this.AdicionarAtividadeForm.value.DataFimData,
        this.AdicionarAtividadeForm.value.DataFimHora
      ),
      Conteudo: this.AdicionarAtividadeForm.value.ConteudoAtividade,
      MateriaID: this.data.MateriaID,
      UsuarioID: this.data.UsuarioID,
    };
console.log(formData)
    this.atividadeServive.AdicionarAtividade(formData);
  }

  formatDate(dateString: string, timeString: string): dateString {
    // 1. Parse date and time strings (assuming ISO 8601 format)
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':').map(Number); // Parse hours and minutes using map and Number

    // 2. Handle potential parsing errors (concisely)
    if (isNaN(date.getTime()) || isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid date or time format:', dateString, timeString);
      return '';
    }

    // 3. Set time components and format (concise string template)
    date.setHours(hours);
    date.setMinutes(minutes);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
