import { Pessoa } from './autentication/user/Pessoa.interface';

export interface userResponse {
  success: boolean;
  message: string;
  user: Pessoa['user'];
}
