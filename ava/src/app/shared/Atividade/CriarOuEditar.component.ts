import {
  AtividadePadrao,
  IAtividade,
  TiposAtividades,
} from './../../Interfaces/atividade.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RetornoRequisicaoModalComponent } from 'app/components/modais/retornoRequisicao/retornoRequisicao.component';
import {
  IAtividadeFormulario,
  InfoModalAddAtividade,
  selectTiposAtividades,
  TipoAtividade,
} from 'app/Interfaces/atividade.interface';
import { AtividadesService } from 'app/services/atividades.service';

@Component({
  selector: 'app-criarOuEditarAtividade',
  templateUrl: './CriarOuEditar.component.html',
})
export class CriarOuEditarAtividadeComponent implements OnInit {
  @Input() atividadeParaEditar!: InfoModalAddAtividade;

  selectTiposAtividades: TipoAtividade[] = selectTiposAtividades;
  CriarOuEditarForm!: FormGroup;
  fileName!: string;
  caminhoArquivo!: string;
  atividadeRecebidoDaMateria!: IAtividade;
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

  constructor(
    public atividadeService: AtividadesService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.CriarOuEditarForm = this.formBuilder.group({
      TituloAtividade: [
        this.atividadeParaEditar.atividade?.Nome ?? '',
        Validators.required,
      ],
      TipoAtividade: [
        this.atividadeParaEditar.atividade?.TipoAtividadeID ?? '',
        Validators.required,
      ],
      Situacao: [
        this.atividadeParaEditar.atividade?.Situacao ?? '',
        Validators.required,
      ],
      DataInicioData: [
        this.DividirDatahora(
          this.atividadeParaEditar.atividade?.PrazoInicial.toString()
        )[0],
        Validators.required,
      ],
      DataInicioHora: [
        this.DividirDatahora(
          this.atividadeParaEditar.atividade?.PrazoInicial.toString()
        )[1],
        Validators.required,
      ],
      DataFimData: [
        this.DividirDatahora(
          this.atividadeParaEditar.atividade?.PrazoFinal.toString()
        )[0],
        Validators.required,
      ],
      DataFimHora: [
        this.DividirDatahora(
          this.atividadeParaEditar.atividade?.PrazoFinal.toString()
        )[1],
        Validators.required,
      ],
      ConteudoAtividade: [this.atividadeParaEditar.atividade?.Conteudo ?? null],
    });
  }

  anexarArquivo(e: Event) {
    const input = e.target as HTMLInputElement;
    input?.files != null
      ? (this.fileName = input?.files[0].name)
      : (this.fileName = 'Nenhum arquivo adicionado');
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.atividadeService.upload(file).subscribe(
        (response) => {
          console.log('Upload bem-sucedido', response);
          this.caminhoArquivo = response.filePath;
          this.fileName = 'Arquivo carregado com sucesso!';
        },
        (error) => {
          console.error('Erro no upload', error);
          this.fileName = 'Erro ao carregar o arquivo.';
        }
      );
    } else {
      this.fileName = 'Nenhum arquivo adicionado';
    }
  }

  onSubmit() {
    if (this.CriarOuEditarForm.valid) {
      const formData: IAtividadeFormulario = {
        AtividadesMateriasID:
          this.atividadeParaEditar?.atividade?.AtividadesMateriasID,
        Nome: this.CriarOuEditarForm.value.TituloAtividade,
        TipoAtividadeID: parseInt(this.CriarOuEditarForm.value.TipoAtividade),
        Situacao: this.CriarOuEditarForm.value.Situacao,
        PrazoInicial: this.FormatarData(
          this.CriarOuEditarForm.value.DataInicioData,
          this.CriarOuEditarForm.value.DataInicioHora
        ),
        PrazoFinal: this.FormatarData(
          this.CriarOuEditarForm.value.DataFimData,
          this.CriarOuEditarForm.value.DataFimHora
        ),
        Conteudo: this.CriarOuEditarForm.value.ConteudoAtividade,
        MateriaID: this.atividadeParaEditar?.MateriaID ?? 0,
        UsuarioID: this.atividadeParaEditar?.UsuarioID ?? 0,
        CaminhoArquivo: this.caminhoArquivo,
        UsuarioInclusao: this.atividadeParaEditar?.UsuarioID?.toString() ?? '',
        DataInclusao: null,
        UsuarioAlteracao: null,
        DataAlteracao: null,
      };

      this.atividadeService.AdicionarAtividade(formData).subscribe({
        next: (response) => {
          this.modalSucesso('Sucesso ao criar atividade');
          this.CriarOuEditarForm.reset();
        },
        error: (error) => {
          console.error('Unexpected error:', error);
          this.modalErro(
            'Erro desconhecido. Por favor, tente novamente mais tarde.'
          );
        },
      });
    }
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
  DividirDatahora(dataHora: string | undefined) {
    return dataHora?.split('T') ?? '';
  }
}
