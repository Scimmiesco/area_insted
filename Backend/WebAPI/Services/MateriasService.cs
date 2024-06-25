using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class MateriasService : IMateriasService
    {
        private readonly AreaInstedContext _context;

        public MateriasService(AreaInstedContext context)
        {
            _context = context;
        }

        public List<MateriaDto> GetMaterias(int usuarioID)
        {
            if (usuarioID == 0)
            {
                throw new ArgumentException("ID informado é inválido.");
            }

            var user = _context.TbUsers.FirstOrDefault(u => u.IdUser == usuarioID);
            if (user == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            var userId = user.IdUser;
            List<MateriaDto> materias;
            if (user.SnTeacher)
            {
                materias = _context.TbClasses
                    .Where(u => u.IdUser == user.IdUser)
                    .Select(c => new MateriaDto
                    {
                        IdClass = c.IdClass,
                        IdUser = c.IdUser,
                        NmClass = c.NmClass,
                        NmWeekday = c.NmWeekday,
                        NmClassroom = c.NmClassroom,
                        NrTotal = c.NrTotal,
                        NmUser = c.NmUser,
                        DtTime = c.DtTime
                    })
                    .ToList();
            }
            else
            {
                var IdsUserClass = _context.TbUserClasses
                    .Where(u => u.IdUser == userId)
                    .Select(a => a.IdClass)
                    .ToList();

                materias = _context.TbClasses
                   .Where(u => IdsUserClass.Contains(u.IdClass))
                   .Select(c => new MateriaDto
                   {
                       IdClass = c.IdClass,
                       IdUser = c.IdUser,
                       NmClass = c.NmClass,
                       NmWeekday = c.NmWeekday,
                       NmClassroom = c.NmClassroom,
                       NrTotal = c.NrTotal,
                       NmUser = c.NmUser,
                       DtTime = c.DtTime
                   })
                   .ToList();
            }
            return materias;
        }
    }

}
