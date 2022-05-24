using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Http;
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

    /// <summary>
    /// Create new company
    /// </summary>
    /// <returns>company_id</returns>
    /// <response code="200">New company has been created</response>
    /// <response code="400">Incorrect TIN</response>

    [HttpPost]
    [Produces("application/json", "application/xml")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Post([FromBody] Company data)
    {
        if (!Validations.IsValidInn(data.tin))
        {
            return new StatusCodeResult(400);
        }
        this.Context.companies.Add(data);
        this.Context.SaveChanges();
        var d = this.Context.companies.OrderBy((e) => e.company_id).Last();
        this.Context.user_company.Add(new User_company() { user_id = data.user_id, company_id = d.company_id, role = "own" });
        this.Context.SaveChanges();
        return new ObjectResult(d.company_id);

    }

    /// <summary>
    /// Change company
    /// </summary>
    /// <returns>Status Code</returns>
    /// <response code="200">Company info has been changed</response>
    /// <response code="400">Incorrect TIN</response>

    [HttpPut]
    [Produces("application/json", "application/xml")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

    /// <summary>
    /// Get company
    /// </summary>
    /// <returns>Company Data</returns>
    /// <response code="200">Request is correct</response>
    /// <response code="404">Company not found</response>
    [Route("{company_id}/{user_id}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Get(int company_id, int user_id)
    {
        var arr = new List<Worker>();
        var role = this.Context.user_company.Find(user_id).role;
        var result = new WorkerResponce() { workers = arr, role = role };
        if (role == "own")
        {
            var t = this.Context.user_company.Where((e) => e.company_id == company_id && e.user_id != user_id);
            foreach (var e in t)
            {
                var email = this.Context.users.Find(e.user_id);
                arr.Add(new Worker() { user_id = e.user_id, worker_email = email.email });
            }
        }
        return new ObjectResult(result);
    }

    public class WorkerResponce
    {
        public List<Worker> workers { get; set; }
        public string role { get; set; }

    }
    public class Worker
    {
        public int user_id { get; set; }
        public string worker_email { get; set; }

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

    /// <summary>
    /// Delete worker
    /// </summary>

    [Route("deleteWorker")]
    [HttpDelete]

    public void DeleteWorker([FromBody] int user_id)
    {
        var ed = this.Context.users.Find(user_id);
        this.Context.users.Remove(ed);
        this.Context.SaveChanges();

    }


    /// <summary>
    /// Delete company
    /// </summary>
    [HttpDelete]
    public void Delete([FromBody] int company_id)
    {
        var ed = this.Context.companies.Find(company_id);
        this.Context.companies.Remove(ed);
        this.Context.SaveChanges();

    }


}