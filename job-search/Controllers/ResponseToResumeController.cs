using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class ResponseToResumeController : Controller
{
    private EFTodoDBContext Context;

    public ResponseToResumeController(EFTodoDBContext db)
    {
        this.Context = db;
    }


    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] ResponseToResume data)
    {
        this.Context.responseToResume.Add(data);
    }

    [Route("{resume_id}")]
    [HttpGet]
    public IEnumerable<CompanyResponse> Get(int resume_id)
    {
        var list = this.Context.responseToResume.Where((response) => response.resume_id == resume_id).ToList();
        var result = list.Select((item) =>
        {
            var a = new CompanyResponse();
            a.response = item;
            a.company = this.Context.companies.Where((company) => company.user_id == item.company_id).First();
            return a;
        });
        return result;
    }

    [HttpDelete]
    [Produces("application/json", "application/xml")]
    public void Delete([FromBody] ResponseToResume response)
    {
        this.Context.responseToResume.Remove(response);
    }

    public class CompanyResponse
    {
        public ResponseToResume response { get; set; }
        public Company company { get; set; }
    }
}