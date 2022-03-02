using System.Collections.Generic;
using job_search;
using job_search.Models;
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
    public IEnumerable<User> Get()
    {
        // var r = Context.users;
        return Context.users; //

    }


}