using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class ResumeController : Controller
{
    private EFTodoDBContext Context;

    public ResumeController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] Resume data)
    {
        this.Context.resumes.Add(data);
        this.Context.SaveChanges();
    }

    public class Work_experience
    {

    }

}