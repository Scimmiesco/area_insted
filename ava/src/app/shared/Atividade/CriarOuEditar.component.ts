import {
  IAtividade,
  IResponseAdicionarAtividade,
} from './../../Interfaces/atividade.interface';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  @Input() atividadeParaEditar: InfoModalAddAtividade | null = null;

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
      TituloAtividade: ['', Validators.required],
      TipoAtividade: ['', Validators.required],
      Situacao: ['', Validators.required],
      DataInicioData: ['', Validators.required],
      DataInicioHora: ['', Validators.required],
      DataFimData: ['', Validators.required],
      DataFimHora: ['', Validators.required],
      ConteudoAtividade: [null],
    });

    if (this.atividadeParaEditar?.Atividade) {
      this.CriarOuEditarForm.patchValue({
        TituloAtividade: this.atividadeParaEditar.Atividade.Nome ?? '',
        TipoAtividade: this.atividadeParaEditar.Atividade.TipoAtividadeID ?? '',
        Situacao: this.atividadeParaEditar.Atividade.Situacao ?? '',
        DataInicioData: this.DividirDatahora(
          this.atividadeParaEditar.Atividade.PrazoInicial.toString()
        )[0],
        DataInicioHora: this.DividirDatahora(
          this.atividadeParaEditar.Atividade.PrazoInicial.toString()
        )[1],
        DataFimData: this.DividirDatahora(
          this.atividadeParaEditar.Atividade.PrazoFinal.toString()
        )[0],
        DataFimHora: this.DividirDatahora(
          this.atividadeParaEditar.Atividade.PrazoFinal.toString()
        )[1],
        ConteudoAtividade: this.atividadeParaEditar.Atividade.Conteudo ?? null,
      });
    }
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
          this.caminhoArquivo = response.filePath;
          this.fileName = 'Arquivo carregado com sucesso!';
        },
        (error) => {
          this.fileName = 'Erro ao carregar o arquivo.';
        }
      );
    } else {
      this.fileName = 'Nenhum arquivo adicionado';
    }
  }

  onSubmit() {
    if (this.CriarOuEditarForm.valid) {
      console.log(this.atividadeParaEditar?.MateriaID);
      let formData: IAtividadeFormulario = {
        AtividadesMateriasID:
          this.atividadeParaEditar?.Atividade?.AtividadesMateriasID,
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
        MateriaID:
          this.atividadeParaEditar?.MateriaID ??
          this.atividadeParaEditar?.Atividade?.MateriaID ??
          0,
        UsuarioID:
          this.atividadeParaEditar?.UsuarioID ??
          this.atividadeParaEditar?.Atividade?.UsuarioID ??
          0,
        CaminhoArquivo: this.caminhoArquivo,
        UsuarioInclusao: this.atividadeParaEditar?.UsuarioID?.toString() ?? '',
        DataInclusao: undefined,
        UsuarioAlteracao:
          this.atividadeParaEditar?.UsuarioID?.toString() ??
          this.atividadeParaEditar?.Atividade?.UsuarioID.toString() ??
          '',
        DataAlteracao: undefined,
      };
      console.log(formData);
      this.atividadeService.AdicionarAtividade(formData).subscribe({
        next: (response: IResponseAdicionarAtividade) => {
          this.modalSucesso(response.message);
          this.CriarOuEditarForm.reset();
          setTimeout(() => this.dialog.closeAll(), 1500);
        },
        error: (error) => {
          switch (error.status) {
            case 500:
              this.modalErro('Erro de conexão com o servidor.');
              break;
            case 404:
              this.modalErro('Usuário Inválido.');
              break;
            case 401:
              this.modalErro('Senha inválida.');
              break;
            case 403:
              this.modalErro(
                'Tentativas inválidas excedidas. Tente novamente em 3 minutos.'
              );
              break;
            default:
              this.modalErro('Erro desconhecido ao entrar. Contate o suporte.');
          }
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
      data: { message: message, tipoRetorno: 'sucesso' },
      autoFocus: true,
      closeOnNavigation: true,
    });
  }

  modalErro(message: string) {
    this.dialog.open(RetornoRequisicaoModalComponent, {
      data: { message: message, tipoRetorno: 'erro' },
      autoFocus: true,
      closeOnNavigation: true,
    });
  }
  DividirDatahora(dataHora: string | undefined) {
    return dataHora?.split('T') ?? '';
  }
}
