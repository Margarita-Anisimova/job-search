using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class ProfessionController : Controller
{
    private EFTodoDBContext Context;

    public ProfessionController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    public class professionsList
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    [HttpGet]
    public IEnumerable<professionsList> Get()
    {
        return this.Context.profession_ref.Select((e) => new professionsList() { id = e.profession_id, name = e.profession });
    }
}