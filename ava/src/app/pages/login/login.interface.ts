import { Pessoa } from "app/Interfaces/Pessoa.interface";

export interface LoginInterface {
  login: {
    ra?: string;
    email?: string;
    cpf?: string;
  }
  passwordHashed: string;
}

export interface ResponseInterface {

  success: boolean;
  message: string;
  token: string;
}
