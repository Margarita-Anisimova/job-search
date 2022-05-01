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
        data.publication_date = DateTime.Today;
        this.Context.responseToResume.Add(data);
        this.Context.SaveChanges();
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
            a.vacancy = this.Context.vacancies.Where((vacancy) => vacancy.vacancy_id == item.vacancy_id).First();
            return a;
        });
        return result;
    }

    [Route("{vacancy_id}/{resume_id}")]
    [HttpGet]
    public bool IsResponse(int vacancy_id, int resume_id)
    {
        return this.Context.responseToResume.Any(e => e.vacancy_id == vacancy_id && e.resume_id == resume_id);
    }

    [HttpDelete]
    [Produces("application/json", "application/xml")]
    public void Delete([FromBody] ResponseToResume response)
    {
        this.Context.responseToResume.Remove(response);
        this.Context.SaveChanges();
    }

    public class CompanyResponse
    {
        public ResponseToResume response { get; set; }
        public Vacancy vacancy { get; set; }
    }
}