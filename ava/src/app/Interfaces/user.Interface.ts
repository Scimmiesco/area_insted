import { Pessoa } from './Pessoa.interface';

export interface userResponse {
  success: boolean;
  message: string;
  user: Pessoa['user'];
}
