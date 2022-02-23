using System.Collections.Generic;
using job_search;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class Table_1Controller : Controller
{
    private EFTodoDBContext Context;

    public Table_1Controller(EFTodoDBContext db)
    {
        this.Context = db;
    }


    [HttpGet]
    public IEnumerable<Table_1> Get()
    {
        return Context.Table_1;

    }


}