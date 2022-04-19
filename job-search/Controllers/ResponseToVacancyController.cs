using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;
using static ResponseToResumeController;

[Route("[controller]")]
public class ResponseToVacancyController : Controller
{
    private EFTodoDBContext Context;

    public ResponseToVacancyController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    public class ResponseToVacancyFromServer
    {
        public int vacancy_id { get; set; }
        public int resume_id { get; set; }
    }

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] ResponseToVacancy data)
    {
        var res = this.Context.responseToVacancy.Where((e) => e.resume_id == data.resume_id && e.vacancy_id == data.vacancy_id);
        if (res.Count() == 0)
            this.Context.responseToVacancy.Add(data);
        else
            this.Context.responseToVacancy.Update(data);
    }

    [Route("{vacancy_id}")]
    [HttpGet]
    public IEnumerable<VacancyResponse> Get(int vacancy_id)
    {
        var list = this.Context.responseToVacancy.Where((response) => response.vacancy_id == vacancy_id).ToList();
        var result = list.Select((item) =>
        {
            var a = new VacancyResponse();
            a.response = item;
            a.resume = this.Context.resumes.Where((resume) => resume.resume_id == item.resume_id).First();
            return a;
        });
        return result;
    }

    [Route("result/{resume_id}")]
    [HttpGet]
    public IEnumerable<ResponseForApplicant> GetResponseResults(int resume_id)
    {
        var list = this.Context.responseToVacancy.Where((response) => response.resume_id == resume_id).ToList();
        var result = list.Select((item) =>
        {
            var a = new ResponseForApplicant();
            a.response = item;
            a.vacancy = this.Context.vacancies.Where((vacancy) => vacancy.vacancy_id == item.vacancy_id).First();
            return a;
        });
        return result;
    }

    public class ResponseForApplicant
    {
        public ResponseToVacancy response { get; set; }
        public Vacancy vacancy { get; set; }
    }

    [HttpDelete]
    [Produces("application/json", "application/xml")]
    public void Delete([FromBody] ResponseToVacancy response)
    {
        this.Context.responseToVacancy.Remove(response);
    }

    public class VacancyResponse
    {
        public Resume resume { get; set; }
        public ResponseToVacancy response { get; set; }
    }

}