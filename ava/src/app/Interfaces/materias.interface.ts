export interface ResponseMateriasI {
  success: boolean;
  message: string;
  materias: {
    IdClass: string;
    IdUser: string;
    NmClass: string;
    NmWeekday: string;
    NmClassroom: string;
    NrTotal: number;
    NmUser: string;
    DtTime: string;
  }[];
}
export const materiaPadrao: ResponseMateriasI['materias'] = [
  {
    IdClass: '0',
    IdUser: '0',
    NmClass: 'Matéria do aluno',
    NmWeekday: 'Segunda-feira',
    NmClassroom: 'Sala 0',
    NrTotal: 0,
    NmUser: 'Professor da matéria',
    DtTime: '19:00',
  },
  {
    IdClass: '1',
    IdUser: '0',
    NmClass: 'Matéria do aluno',
    NmWeekday: 'Segunda-feira',
    NmClassroom: 'Sala 0',
    NrTotal: 0,
    NmUser: 'Professor da matéria',
    DtTime: '19:00',
  },
];
