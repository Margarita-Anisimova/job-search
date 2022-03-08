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
    public void Post([FromBody] ResumeType data)
    {
        var resume = new Resume(data.user_id, data.city, data.citizenship, data.birth_date,
        data.desired_position, data.desired_salary, data.work_type, data.ready_move, data.skills, data.profession);
        this.Context.resumes.Add(resume);
        this.Context.SaveChanges();
    }

    public class ResumeType
    {
        public int user_id { set; get; }
        public int resume_id { set; get; }

        public string birth_date { set; get; }
        public string desired_position { set; get; }
        public int desired_salary { set; get; }
        public string work_type { set; get; }
        public string ready_move { set; get; }
        public string skills { set; get; }
        public string profession { set; get; }
        public string city { set; get; }
        public string citizenship { set; get; }
        public Education Education {set; get;} 
        public Work_Experience Work_Experience {set; get;}




    }

}