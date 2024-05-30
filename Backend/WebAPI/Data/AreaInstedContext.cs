using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Data;

public partial class AreaInstedContext : DbContext
{
    public AreaInstedContext(DbContextOptions<AreaInstedContext> options) : base(options)
    {

    }

    public DbSet<TbUser> TbUsers { get; set; }
    public DbSet<TbAcadActivity> TbAcadActivities { get; set; }

    public DbSet<TbAddress> TbAddresses { get; set; }

    public DbSet<TbClass> TbClasses { get; set; }

    public DbSet<TbClassFile> TbClassFiles { get; set; }

    public DbSet<TbFrequency> TbFrequencies { get; set; }

    public DbSet<TbGrade> TbGrades { get; set; }

    public DbSet<TbUserClass> TbUserClasses { get; set; }

}