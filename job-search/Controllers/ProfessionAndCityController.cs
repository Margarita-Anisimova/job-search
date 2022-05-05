using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class ProfessionAndCityController : Controller
{
    private EFTodoDBContext Context;

    public ProfessionAndCityController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    public class TemplateResult
    {
        public int id { get; set; }
        public string name { get; set; }
    }


    public class Result
    {
        public IEnumerable<TemplateResult> professions { get; set; }
        public IEnumerable<TemplateResult> cities { get; set; }
    }

    [HttpGet]
    public Result Get()
    {
        var r = new Result();
        r.professions = this.Context.profession_ref.Select((e) => new TemplateResult() { id = e.profession_id, name = e.profession });
        r.cities = this.Context.cities.Select((e) => new TemplateResult() { id = e.city_id, name = e.city });
        return r;
    }
}