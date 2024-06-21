import { getLocaleDateTimeFormat } from '@angular/common';

export enum TiposAtividades {
  ARQUIVO = 3,
  PAGINA = 2,
  TEXTO = 1,
}

export interface IAtividadesComponent {
  tipo: TiposAtividades;
  titulo?: string;
  href?: string;
  conteudo?: string;
}

export interface IAtividadeTexto {
  conteudo: string;
}

export interface IAtividadeArquivo {
  titulo: string;
  href: string;
}

export interface IAtividadePagina {
  titulo: string;
  href: string;
  conteudo: string;
}

export interface IResponseAtividades {
  success: boolean;
  message: string;
  atividades: IAtividade[];
}
export interface IAtividade {
  AtividadesMateriasID: number;
  UsuarioID: number;
  MateriaID: number;
  TipoAtividadeID: number;
  Nome: string;
  PrazoFinal: Date;
  Conteudo: string;
  Situacao: string;
  CaminhoArquivo: string | null;
  UsuarioInclusao: string | null;
  DataInclusao: string | null;
  UsuarioAlteracao: string | null;
  DataAlteracao: Date | null;
}

export const AtividadePadrao: IAtividade[] = [
  {
    AtividadesMateriasID: 0,
    UsuarioID: 0,
    MateriaID: 0,
    TipoAtividadeID: 0,
    Nome: '',
    PrazoFinal: new Date(),
    Conteudo: '',
    Situacao: '',
    CaminhoArquivo: null,
    UsuarioInclusao: 'Sistema',
    DataInclusao: new Date().toLocaleDateString(),
    UsuarioAlteracao: null,
    DataAlteracao: null,
  },
];
export interface IAtividadeFormulario {
  UsuarioID: number;
  MateriaID: number;
  TipoAtividadeID: number;
  Nome: string;
  PrazoFinal: string;
  Conteudo: string;
  Situacao: string;
  PrazoInicial: string;
  CaminhoArquivo: string | null;
  UsuarioInclusao: string | null;
  DataInclusao: string | null;
  UsuarioAlteracao: string | null;
  DataAlteracao: Date | null;
}
