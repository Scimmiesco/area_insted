import { createAction, createReducer, on, props } from '@ngrx/store';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';

export interface IappState {
  isAuthenticated: boolean;
  user: Pessoa['user'];
}

export const appInitialState: IappState = {
  isAuthenticated: false,
  user: {
    idUser: 0,
    idAddress: 0,
    nmUser: 'Default',
    nrRegister: 'Testando',
    nrCpf: '100000000',
    nrRg: 0,
    nmExpedition: 'sspms',
    dtBirthdate: '2000-01-01',
    nmSex: 'm',
    nmPhone1: '67999999999',
    nmPhone2: '67999999999',
    nmEmail: 'email@email.com',
    imgFile: null,
    snTeacher: false,
  },
};

export const setUser = createAction(
  '[AppUser] SetUser',
  props<{ payload: Pessoa['user'] }>()
);

export const appReducer = createReducer(
  appInitialState,
  on(setUser, (state, { payload }) => ({
    ...state,
    user: payload,
  }))
);
