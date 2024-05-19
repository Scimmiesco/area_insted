export enum TiposAtividades {
  ARQUIVO = 'Arquivo',
  PAGINA = 'Página',
  BOASVINDAS = 'Bem vindo',
}

export interface IAtividadesComponent {
  tipo: TiposAtividades;
  titulo: string;
  href: string;
}
