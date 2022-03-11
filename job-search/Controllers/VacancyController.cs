using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class VacancyController : Controller
{
    private EFTodoDBContext Context;

    public VacancyController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] Vacancy data)
    {
        this.Context.vacancies.Add(data);
        this.Context.SaveChanges();
    }

    // [Route("{user_id}")]
    // [HttpGet]
    // public Company Get(int user_id)
    // {
    //     var a = this.Context.companies.Where((company) => company.user_id == user_id);
    //     return a.First();
    // }

}