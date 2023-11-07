export interface Pessoa {
  user: {
    IdUser: number;
    IdAddress: number;
    NmUser: string;
    NrRegister: string;
    NrCpf: string;
    NrRg: number;
    NmExpedition: string;
    DtBirthdate: string;
    NmSex: string;
    NmPhone1: string;
    NmPhone2: string;
    NmEmail: string;
    ImgFile: string | null;
    SnTeacher: boolean;
  };
}
