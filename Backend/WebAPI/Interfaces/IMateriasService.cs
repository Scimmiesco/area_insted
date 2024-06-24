using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IMateriasService
    {
        List<MateriaDto> GetMaterias(int usuarioID);

    }
}
