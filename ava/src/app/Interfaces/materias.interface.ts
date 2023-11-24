export interface ResponseMateriasI {
  success: boolean;
  message: string;
  materias:
    | {
        IdClass: string;
        IdUser: string;
        NmClass: string;
        NmWeekday: string;
        NmClassroom: string;
        NrTotal: number;
        NmUser: string;
        DtTime: string;
      }[]
    | null;
}
export const materiaPadrao = {
  IdClass: '0',
  IdUser: '0',
  NmClass: 'Matéria do aluno',
  NmWeekday: 'Segunda-feira',
  NmClassroom: 'Sala 0',
  NrTotal: 0,
  NmUser: 'Professor da matéria',
  DtTime: "19:00"
};
