using Microsoft.EntityFrameworkCore;
using job_search.Models;


namespace job_search
{

    public class EFTodoDBContext : DbContext
    {
        public EFTodoDBContext(DbContextOptions<EFTodoDBContext> options) : base(options)
        { }
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Table_1> Table_1 { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
    }
}