using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using Fissoft.EntityFramework.Fts;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
public class AdminController : Controller
{
    private EFTodoDBContext Context;

    public AdminController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    /// <summary>
    /// Сhange the vacancy status
    /// </summary>
    /// <returns>Status Code</returns>
    /// <response code="200">Status successfully changed</response>

    [Route("vacancies")]
    [HttpPut]
    [Produces("application/json", "application/xml")]
    public IActionResult PutVacancies([FromBody] Note data)
    {
        var r = this.Context.vacancies.Find(data.id);
        r.status = data.status ? "pub" : "del";
        this.Context.SaveChanges();
        return new OkResult();
    }

    /// <summary>
    /// Сhange the resume status
    /// </summary>
    /// <returns>Status Code</returns>
    /// <response code="200">Status successfully changed</response>

    [Route("resumes")]
    [HttpPut]
    [Produces("application/json", "application/xml")]
    public IActionResult PutResumes([FromBody] Note data)
    {
        var r = this.Context.resumes.Find(data.id);
        r.status = data.status ? "pub" : "del";
        this.Context.SaveChanges();
        return new OkResult();
    }

    public class Note
    {
        public bool status { get; set; }
        public int id { get; set; }
    }
}
