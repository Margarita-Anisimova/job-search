using Microsoft.EntityFrameworkCore;
using job_search.Models;
using System;

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
        public DbSet<Profession_ref> profession_ref { get; set; }
        public DbSet<ResponseToResume> responseToResume { get; set; }
        public DbSet<ResponseToVacancy> responseToVacancy { get; set; }
        // public DbSet<Education_ref> education_ref { get; set; }
        public DbSet<Image> image { get; set; }

        // public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ResponseToResume>().HasKey(table => new
            {
                table.resume_id,
                table.vacancy_id
            });
            builder.Entity<ResponseToVacancy>().HasKey(table => new
            {
                table.resume_id,
                table.vacancy_id
            });
            //     builder.Entity<Vacancy>()
            //            .Property(e => e.publication_date)
            //            .HasColumnType("date");
            //     builder.Entity<ResponseToVacancy>()
            //             .Property(e => e.publication_date)
            //             .HasColumnType("date");
            //     builder.Entity<ResponseToResume>()
            //             .Property(e => e.publication_date)
            //             .HasColumnType("date");
            //     builder.Entity<Resume>()
            //             .Property(e => e.publication_date)
            //             .HasColumnType("date");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:job-search.database.windows.net,1433;Initial Catalog=job-search1;Persist Security Info=False;User ID=marina;Password=28atifis!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
             builder =>
                {
                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
            base.OnConfiguring(optionsBuilder);
        }
    }


}