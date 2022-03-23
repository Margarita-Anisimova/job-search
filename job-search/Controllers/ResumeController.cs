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

    public class FullResume
    {
        public Resume resumeInfo { set; get; }
        public Education[] education { set; get; }
        public Work_Experience[] workExperience { set; get; }
    }



    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] FullResume resume)
    {
        var a = this.Context.resumes.Where((res) => res.resume_id == resume.resumeInfo.resume_id);
        if (a.Count() == 0)
        {
            this.Context.resumes.Add(resume.resumeInfo);
            this.Context.SaveChanges();
            var id = this.Context.resumes.OrderBy((e) => e.resume_id).Last().resume_id;
            resume.education.ToList().ForEach((e) => e.resume_id = id);
            resume.workExperience.ToList().ForEach((e) => e.resume_id = id);
            this.Context.education.AddRange(resume.education);
            this.Context.work_experience.AddRange(resume.workExperience);
            this.Context.SaveChanges();

        }
        else
        {
            Put(resume);
        }
    }

    public void Put([FromBody] FullResume resume)
    {
        this.Context.resumes.Update(resume.resumeInfo);
        this.Context.education.UpdateRange(resume.education);
        this.Context.work_experience.UpdateRange(resume.workExperience);
        this.Context.SaveChanges();
    }

    // [Route("{user_id}")]
    // [HttpGet]
    // public IActionResult Get(string user_id)
    // {
    //     // var a = this.Context.users.Where((user) => user.user_id == user_id);
    //     // if (a.Count() != 0 && a.First().password == password)
    //     // {
    //     //     return new ObjectResult(a.First());
    //     // }
    //     // else
    //     // {
    //     //     return NotFound();
    //     // }

    // }

}