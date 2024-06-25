export enum TiposAtividades {
  ARQUIVO = 3,
  PAGINA = 2,
  TEXTO = 1,
}
export interface TipoAtividade {
  tipoID: number;
  nomeTipo: string;
}
export interface IAtividadesComponent {
  tipo: TiposAtividades;
  titulo?: string;
  href?: string;
  conteudo?: string;
  prazoInicial?: Date;
  prazoFinal?: Date;
}

export interface IAtividadeTexto {
  conteudo: string;
}

export interface IAtividadeArquivo {
  titulo: string;
  href: string;
  prazoInicial: Date | undefined;
  prazoFinal: Date | undefined;
}

export interface IAtividadePagina {
  titulo: string;
  href: string;
  conteudo: string;
  prazoInicial: Date | undefined;
  prazoFinal: Date | undefined;
}

export interface IResponseAtividades {
  success: boolean;
  message: string;
  atividades: IAtividade[];
}
export interface IResponseAdicionarAtividade {
  success: boolean;
  message: string;
}
export interface IAtividade {
  AtividadesMateriasID?: number;
  UsuarioID: number;
  MateriaID: number;
  TipoAtividadeID: number;
  Nome: string;
  PrazoFinal: Date;
  PrazoInicial: Date;
  Conteudo?: string;
  Situacao: string;
  CaminhoArquivo?: string;
  UsuarioInclusao?: string;
  DataInclusao?: string;
  UsuarioAlteracao?: string;
  DataAlteracao?: Date;
  NmClass?: string;
}

export const AtividadePadrao: IAtividade[] = [
  {
    AtividadesMateriasID: 0,
    UsuarioID: 0,
    MateriaID: 0,
    TipoAtividadeID: 0,
    Nome: 'Atividade padrão',
    PrazoFinal: new Date(),
    PrazoInicial: new Date(),
    Conteudo: 'Atividade padrão',
    Situacao: 'A',
    CaminhoArquivo: undefined,
    UsuarioInclusao: 'Sistema',
    DataInclusao: new Date().toLocaleDateString(),
    UsuarioAlteracao: undefined,
    DataAlteracao: undefined,
    NmClass: 'Materia Padrão',
  },
];
export interface IAtividadeFormulario {
  AtividadesMateriasID?: number;
  UsuarioID?: number;
  MateriaID: number;
  TipoAtividadeID: number;
  Nome: string;
  PrazoFinal?: string;
  Conteudo?: string;
  Situacao: string;
  PrazoInicial?: string;
  CaminhoArquivo?: string;
  UsuarioInclusao?: string;
  DataInclusao?: string;
  UsuarioAlteracao?: string;
  DataAlteracao?: Date;
}
export interface InfoModalAddAtividade {
  MateriaID?: number;
  UsuarioID?: number;
  Atividade?: IAtividade;
}

export const selectTiposAtividades: TipoAtividade[] = [
  { tipoID: TiposAtividades.TEXTO, nomeTipo: 'Texto' },
  { tipoID: TiposAtividades.PAGINA, nomeTipo: 'Pagina' },
  { tipoID: TiposAtividades.ARQUIVO, nomeTipo: 'Arquivo' },
];
