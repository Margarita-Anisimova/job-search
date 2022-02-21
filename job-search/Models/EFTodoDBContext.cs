using Microsoft.EntityFrameworkCore;

namespace job_search
{

    public class EFTodoDBContext : DbContext
    {
        public EFTodoDBContext(DbContextOptions<EFTodoDBContext> options) : base(options)
        { }
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}