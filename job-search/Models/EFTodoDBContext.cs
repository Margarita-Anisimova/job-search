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
        public DbSet<Work_Experience> work_experience { get; set; }

        public DbSet<Education> education { get; set; }
        public DbSet<Company> companies { get; set; }
        public DbSet<Vacancy> vacancies { get; set; }
        // public DbSet<Education_ref> education_ref { get; set; }

        // public DbSet<Company> Companies { get; set; }
    }
}