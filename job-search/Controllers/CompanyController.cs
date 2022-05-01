using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;
using ValidationsCollection;

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
    public IActionResult Post([FromBody] Company data)
    {
        if (!Validations.IsValidInn(data.tin))
        {
            return new StatusCodeResult(400);
        }
        this.Context.companies.Add(data);
        this.Context.SaveChanges();
        var d = this.Context.companies.OrderBy((e) => e.company_id).Last();
        return new ObjectResult(d.company_id);

    }

    [HttpPut]
    [Produces("application/json", "application/xml")]
    public IActionResult Put([FromBody] Company data)
    {
        if (!Validations.IsValidInn(data.tin))
        {
            return new StatusCodeResult(400);
        }
        this.Context.companies.Update(data);
        this.Context.SaveChanges();
        return new OkResult();
    }

    public class CompanyResponce
    {
        public CompanyFull company { set; get; }
        public User user { set; get; }
    }


    public class CompanyFull
    {
        public Company companyInfo { get; set; }
        public Vacancy[] vacancies { get; set; }
    }

    // [Route("{user_id}")]
    // [HttpGet]
    // public IActionResult Get(int user_id)
    // {
    //     var a = this.Context.companies.Where((company) => company.user_id == user_id);
    //     var responce = new CompanyResponce();
    //     if (a.Count() == 0)
    //     {
    //         responce.user = this.Context.users.Where((user) => user.user_id == user_id).First();
    //         return new ObjectResult(responce);
    //     }
    //     var t = this.Context.vacancies.Where((v) => v.company_id == a.First().company_id).ToArray();
    //     var comp = new CompanyFull();
    //     comp.companyInfo = a.First();
    //     comp.vacancies = t;

    //     responce.company = comp;
    //     responce.user = this.Context.users.Where((user) => user.user_id == a.First().user_id).First();
    //     return new ObjectResult(responce);
    // }

}