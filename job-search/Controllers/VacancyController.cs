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
    public IActionResult Post([FromBody] Vacancy data)
    {
        this.Context.vacancies.Add(data);
        this.Context.SaveChanges();
        var d = this.Context.vacancies.OrderBy((e) => e.vacancy_id).Last();
        return new ObjectResult(d.vacancy_id);

    }

    [HttpPut]
    [Produces("application/json", "application/xml")]
    public void Put([FromBody] Vacancy data)
    {
        this.Context.vacancies.Update(data);
        this.Context.SaveChanges();
    }

}