import { Token } from './token.interface';
export interface LoginInterface {
  login: {
    ra?: string;
    email?: string;
    cpf?: string;
  }
  senhaCriptografada: string;
}

export interface ResponseInterface {
  success: boolean;
  message: string;
  token: string;
}
