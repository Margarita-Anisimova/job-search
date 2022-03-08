using Microsoft.EntityFrameworkCore;
using job_search.Models;

namespace job_search
{

    public class EFTodoDBContext : DbContext
    {
        public EFTodoDBContext(DbContextOptions<EFTodoDBContext> options) : base(options)
        { }
        public DbSet<User> users { get; set; }
        public DbSet<Resume> resumes { get; set; }

        public DbSet<Work_Experience> work_Experiences { get; set; }
        public DbSet<Education> educations { get; set; }


        // public DbSet<Profession_ref> profession_Refs {get; set; }

        // public DbSet<Work_type_ref> work_type_refs {get; set; }
        // public DbSet<Education_ref> education_ref { get; set; }

        // public DbSet<Company> Companies { get; set; }
    }
}