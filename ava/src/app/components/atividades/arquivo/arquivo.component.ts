import { Component, Input } from '@angular/core';
import {
  IAtividadeArquivo,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';
import { AtividadesService } from 'app/services/atividades.service';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrls: ['./arquivo.component.css'],
})
export class ArquivoComponent {
  @Input() atividadeArquivo!: IAtividadeArquivo;
  @Input() acessoDocente!: boolean;

  atividadeVista = false as boolean;
  EnumTiposAtividades = TiposAtividades;
  arquivoAdicionado!: boolean;
  fileName!: string;
  caminhoArquivo!: string;

  constructor(public atividadesService: AtividadesService) {}

  ngOnInit(): void {}
  marcarVisto() {
    this.atividadeVista = !this.atividadeVista;
  }
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
}
