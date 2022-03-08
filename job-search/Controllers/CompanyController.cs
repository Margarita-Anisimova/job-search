using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

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
        this.Context.companies.Add(data);
        this.Context.SaveChanges();
    }

    [Route("{user_id}")]
    [HttpGet]
    public Company Get(int user_id)
    {
        // var response = new CompanyResponse();
        var a = this.Context.companies.Where((company) => company.user_id == user_id);
        return a.First();
        // if (a.Count() == 0)
        // {
        //     response.Error = true;
        // }
        // else if (a.First().password == password)
        // {
        //     response.User = a.First();
        // }
        // else
        // {
        //     response.Error = true;
        // }
        // return response;
    }

}