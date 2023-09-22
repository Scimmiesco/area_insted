import { Pessoa } from "app/Interfaces/Pessoa.interface";

export interface LoginInterface {
  login: {
    ra?: string;
    email?: string;
    cpf?: string;
  }
  password: string;
}

export interface ResponseInterface {

  success: boolean;
  message: string;
  token: string;
}
