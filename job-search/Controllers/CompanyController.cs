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
    public IActionResult Post([FromBody] Company data)
    {
        this.Context.companies.Add(data);
        this.Context.SaveChanges();
        var d = this.Context.companies.OrderBy((e) => e.company_id).Last();
        return new ObjectResult(d.company_id);

    }

    [HttpPut]
    [Produces("application/json", "application/xml")]
    public void Put([FromBody] Company data)
    {
        this.Context.companies.Update(data);
        this.Context.SaveChanges();
    }

    public class CompanyResponce
    {
        public Company companyInfo { get; set; }
        public Vacancy[] vacancies { get; set; }
    }


    [Route("{user_id}")]
    [HttpGet]
    public CompanyResponce Get(int user_id)
    {
        var a = this.Context.companies.Where((company) => company.user_id == user_id).First();
        var t = this.Context.vacancies.Where((v) => v.company_id == a.company_id).ToArray();
        var responce = new CompanyResponce() { companyInfo = a, vacancies = t };
        return responce;
    }

}