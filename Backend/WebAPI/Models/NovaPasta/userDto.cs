using WebAPI.Models;

namespace WebApi.models.dtos
{
    public class userDto
    {
        public int IdUser { get; set; }
        public int IdAddress { get; set; }
        public string NmUser { get; set; }
        public string NrRegister { get; set; }
        public string NrCpf { get; set; }
        public int? NrRg { get; set; }
        public string NmExpedition { get; set; }
        public DateTime DtBirthdate { get; set; }
        public string NmSex { get; set; }
        public string NmPhone1 { get; set; }
        public string NmPhone2 { get; set; }
        public string NmEmail { get; set; }
        public byte[] ImgFile { get; set; }
        public bool SnTeacher { get; set; }
        public userDto(TbUser user)
        {
            IdUser = user.IdUser;
            IdAddress = user.IdAddress;
            NmUser = user.NmUser;
            NrRegister = user.NrRegister;
            NrCpf = user.NrCpf;
            NrRg = user.NrRg;
            NmExpedition = user.NmExpedition;
            DtBirthdate = user.DtBirthdate;
            NmSex = user.NmSex;
            NmPhone1 = user.NmPhone1;
            NmPhone2 = user.NmPhone2;
            NmEmail = user.NmEmail;
            ImgFile = user.ImgFile;
            SnTeacher = user.SnTeacher;
        }
    }

}