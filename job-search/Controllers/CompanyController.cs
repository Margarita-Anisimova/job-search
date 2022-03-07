using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_search;
using job_search.Models;

[Route("[controller]")]
public class CompanyController : Controller
{
    private EFTodoDBContext Context;

    public CompanyController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] Company data)
    {
        this.Context.Companies.Add(data);
        this.Context.SaveChanges();
    }

    [HttpGet]
    public IEnumerable<Company> Get()
    {
        // var r = Context.users;
        return Context.Companies; //

    }
}
