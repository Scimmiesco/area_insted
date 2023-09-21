import { createAction, createReducer, on, props } from '@ngrx/store';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';

export interface IappState {
  isAuthenticated: number;
  user: Pessoa['user'];
  token: string;
}

export const appInitialState: IappState = {
  isAuthenticated: 0,
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
  token: '',
};

export const setUser = createAction(
  '[AppUser] SetUser',
  props<{ payload: Pessoa['user'] }>()
);

export const setIsAuthenticated = createAction(
  '[AppUser] setIsAuthenticated',
  props<{ payload: number }>()
);

export const browseReload = createAction(
  '[AppUser] browseReload',
  props<{ payload: Pessoa['user'] }>()
);

export const setToken = createAction(
  '[AppUser] setToken',
  props<{ payload: string }>()
);
export const browseReloadToken = createAction(
  '[AppUser] setToken',
  props<{ payload: string }>()
);
export const appReducer = createReducer(
  appInitialState,
  on(setUser, browseReload, (state, { payload }) => ({
    ...state,
    user: payload,
    error: null,
  })),
  on(setIsAuthenticated, (state, { payload }) => ({
    ...state,
    isAuthenticated: payload,
  })),
  on(setToken, browseReloadToken, (state, { payload }) => ({
    ...state,
    token: payload,
  }))
);
