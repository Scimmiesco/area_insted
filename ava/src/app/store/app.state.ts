import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';

export interface IappState {
  isAuthenticated: number;
  user: Pessoa['user'];
  token: string;
}

export const appInitialState: IappState = {
  isAuthenticated: 0,
  user: {
    IdUser: 0,
    IdAddress: 0,
    NmUser: 'Default',
    NrRegister: '0000000000',
    NrCpf: '00000000000',
    NrRg: 0,
    NmExpedition: 'sspms',
    DtBirthdate: '2000-01-01',
    NmSex: 'm',
    NmPhone1: '67999999999',
    NmPhone2: '67999999999',
    NmEmail: 'email@email.com',
    ImgFile: null,
    SnTeacher: true,
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

export const selectUser = createFeatureSelector<IappState>('app');

export const getUser = createSelector(selectUser, (state: IappState) => {
  return state.user;
});

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
