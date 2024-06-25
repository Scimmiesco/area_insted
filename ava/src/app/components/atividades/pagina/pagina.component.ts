import { Component, Input } from '@angular/core';
import {
  IAtividadePagina,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';
import { AtividadesService } from 'app/services/atividades.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
})
export class PaginaComponent {
  @Input() atividadePagina!: IAtividadePagina;
  @Input() acessoDocente!: boolean;

  fileName!: string;
  arquivoAdicionado!: boolean;
  caminhoArquivo!: string;
  atividadeVista = false as boolean;
  EnumTiposAtividades = TiposAtividades;

  constructor(private atividadesService: AtividadesService) {}

  anexarArquivo(e: Event) {
    const input = e.target as HTMLInputElement;

    this.arquivoAdicionado = input?.files ? true : false;
    input?.files != null
      ? (this.fileName = input?.files[0].name)
      : (this.fileName = 'Nenhum arquivo adicionado');
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.atividadesService.upload(file).subscribe(
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

  ngOnInit(): void {}
  marcarVisto() {
    this.atividadeVista = !this.atividadeVista;
  }
  validarPrazoFinalAtividade(
    dataPrazoInicial: Date | undefined,
    dataPrazoFinal: Date | undefined
  ): boolean {
    const dataAtual: Date = new Date();
    const prazoFinalDate: Date = new Date(dataPrazoFinal ?? '');
    const prazoInicialDate: Date = new Date(dataPrazoInicial ?? '');

    if (prazoFinalDate && dataAtual > prazoFinalDate) {
      return false;
    }

    if (prazoInicialDate && dataAtual < prazoInicialDate) {
      return false;
    }

    return true;
  }
}
