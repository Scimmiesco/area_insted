export interface ResponseMateriasInterface {
  success: boolean;
  message: string;
  materias: {
    idClass: string,
    idUser: string,
    nmClass: string,
    nmWeekday: string,
    nmClassroom: string,
    nrTotal: number,
    nmUser: string,
    dtTime: Date,
  }[] |  null
}

