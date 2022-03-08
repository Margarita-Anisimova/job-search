using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class EducationController : Controller
{
    private EFTodoDBContext Context;

    public EducationController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] Education data)
    {
        // var r_id = this.Context.resumes.Last<Resume>;
        // var edu = new Education(data.institution, data.graduation_year, data.faculty, data.specialization, data.education_type);
        this.Context.educations.Add(data);
        this.Context.SaveChanges();
    }

    public class Work_experience
    {

    }

}