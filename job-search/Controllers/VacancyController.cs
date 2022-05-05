using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        data.publication_date = DateTime.Today;
        this.Context.vacancies.Add(data);
        this.Context.SaveChanges();
        var d = this.Context.vacancies.OrderBy((e) => e.vacancy_id).Last();
        return new ObjectResult(d.vacancy_id);

    }

    [HttpPut]
    [Produces("application/json", "application/xml")]
    public void Put([FromBody] Vacancy data)
    {
        data.publication_date = DateTime.Today;
        this.Context.vacancies.Update(data);
        this.Context.SaveChanges();
    }

    [HttpGet]
    public List<Vacancy> GetVacancyList()
    {
        var param = HttpContext.Request.Query;
        var result = new List<Vacancy>();
        if (param["admin"] == "true")
        {
            return this.Context.vacancies.Where(res => res.status == "add").ToList();
        }
        if (Int32.Parse(param["profession_id"]) != 0)
            result = this.Context.vacancies.Where((e) => e.profession_id == Int32.Parse(param["profession_id"]) && e.status == "pub").ToList();
        else
        {
            var text = @"SELECT * FROM vacancies WHERE CONTAINS((education_level,work_experience,work_address,responsibilities,requirements,position),'" + param["word"] + @"')";
            result = this.Context.vacancies.FromSqlRaw(text).ToList();
        }
        if (result.Count() != 0)
            result = result
            .Where(vacancy => this.Context.companies.Where((c) => c.company_id == vacancy.company_id).First().city_id == Int32.Parse(param["city_id"])).ToList();


        if (param["education_level"] != "Нет образования" && result.Count() != 0)
            result = result.Where(vacancy => vacancy.education_level == param["education_level"]).ToList();
        if (param["work_experience"] != "" && result.Count() != 0)
            result = result.Where(vacancy =>
            {

                var t = param["work_experience"].ToString();
                var exp = vacancy.work_experience.Split(' ')[0];
                if (t == exp || exp == "без" || Int32.Parse(t.Split('-')[0]) >= Int32.Parse(exp.Split('-')[0]))
                    return true;
                else
                    return false;
            }).ToList();
        if (param["isFilters"] == "true")
        {
            if (param["salary"] != "" && result.Count() != 0)
                result = result.Where(vacancy => Int32.Parse(vacancy.salary) >= Int32.Parse(param["salary"])).ToList();
            if (param["work_type"] != "false,false,false,false,false" && result.Count() != 0)
                result = result.Where(resume =>
                {
                    var t = param["work_type"].ToString().Split(',');
                    var exp = resume.work_type.Split(',');
                    for (var i = 0; i < exp.Length; i++)
                    {
                        if (t[i] == "true" && exp[i] == t[i])
                            return true;
                    }
                    return false;
                }).ToList();

        }
        return result;
    }

    public class VacancyResponse
    {
        public Vacancy vacancy { get; set; }
        public Company company { get; set; }
    }

    [Route("{vacancy_id}")]
    [HttpGet]
    public IActionResult Get(int vacancy_id)
    {

        var a = this.Context.vacancies.Where((v) => v.vacancy_id == vacancy_id).First();
        var company = this.Context.companies.Where((v) => a.company_id == v.company_id).First();
        var result = new VacancyResponse();
        result.vacancy = a;
        result.company = company;
        return new ObjectResult(result);
    }

    [HttpDelete]

    public void Delete([FromBody] int vacancy_id)
    {
        var ed = this.Context.vacancies.Where((res) => res.vacancy_id == vacancy_id).First();
        this.Context.vacancies.Remove(ed);
        this.Context.SaveChanges();

    }

}