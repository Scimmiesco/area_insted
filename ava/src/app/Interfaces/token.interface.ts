export interface Token {
  unique_name: string;
  email: string;
  role: EnumCargos;
  nbf: number;
  exp: number;
  iat: number;

}
export enum EnumCargos {
  PROFESSOR = 'professor',
  ALUNO = 'aluno',
}
