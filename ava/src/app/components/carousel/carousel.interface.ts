export interface Content {
  imagens?: {
    imgSrc: string;
    imgAlt: string;
  };
  materias?: {
    id: number;
    materia: string;
  };
  atividades?: {
    id: number;
    atividade: string;
    expireDate: string;
  };
}
