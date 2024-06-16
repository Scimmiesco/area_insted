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
  },
];
export interface IAtividadeFormulario {
  UsuarioID: number;
  MateriaID: number;
  TipoAtividadeID: number;
  Nome: string;
  PrazoFinal: Date;
  Conteudo: string;
  Situacao: string;
  PrazoInicial: Date;
}
