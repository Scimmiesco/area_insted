export interface ResponseMateriasI {
  success: boolean;
  message: string;
  materias: {
    IdClass: string,
    IdUser: string,
    NmClass: string,
    NmWeekday: string,
    NmClassroom: string,
    NrTotal: number,
    NmUser: string,
    DtTime: Date,
  }[] |  null
}

