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
    public async void Post([FromBody] FullResume resume)
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

    public async void Put([FromBody] FullResume resume)
    {
        this.Context.resumes.Update(resume.resumeInfo);

        foreach (var ed in resume.education)
        {
            switch (ed.status)
            {
                case "add":
                    {
                        this.Context.education.Add(ed);
                        break;
                    }
                case "delete":
                    {
                        this.Context.education.Remove(ed);
                        break;
                    }
                case "modify":
                    {
                        this.Context.education.Update(ed);
                        break;
                    }
            }
        }
        foreach (var we in resume.workExperience)
        {
            switch (we.status)
            {
                case "add":
                    {
                        this.Context.work_experience.Add(we);
                        break;
                    }
                case "delete":
                    {
                        this.Context.work_experience.Remove(we);
                        break;
                    }
                case "modify":
                    {
                        this.Context.work_experience.Update(we);
                        break;
                    }
            }
        }
        // var toDelete = educationsInBase.ToList().Where(e =>
        //         !resume.education.ToList().Any(e1 => e1.education_id == e.education_id));
        // this.Context.education.RemoveRange(toDelete);
        // var toAdd = resume.education.ToList().Where(e =>
        //         !educationsInBase.ToList().Any(e1 => e1.education_id == e.education_id));
        // this.Context.education.AddRange(toAdd);
        // var toUpdate = resume.education.ToList().Where(e =>
        //        educationsInBase.ToList().Any(e1 => e1.education_id == e.education_id));
        // this.Context.education.UpdateRange(toUpdate);

        // var work_experienceInBase = this.Context.work_experience.Where(
        //     (work_experience) => work_experience.resume_id == resume.resumeInfo.resume_id);
        // var toDeletework_experience = work_experienceInBase.Where(e =>
        //         !resume.workExperience.Any(e1 => e1.work_experience_id == e.work_experience_id)).ToList();
        // this.Context.work_experience.RemoveRange(toDeletework_experience);
        // foreach (var work_experience in resume.workExperience)
        // {
        //     var a = this.Context.work_experience.Where((ed) => work_experience.work_experience_id == ed.work_experience_id);
        //     if (a.Count() == 0)
        //     {
        //         this.Context.work_experience.Add(work_experience);
        //     }
        //     else
        //     {
        //         this.Context.work_experience.Update(work_experience);
        //     }
        // }
        this.Context.SaveChanges();
    }


    [Route("{user_id}")]
    [HttpGet]
    public IActionResult Get(int user_id)
    {
        var result = new FullResume();
        var a = this.Context.resumes.Where((resume) => resume.user_id == user_id);
        if (a.Count() == 0)
        {
            return NoContent();
        }
        result.resumeInfo = a.First();
        var ed = this.Context.education.Where((education) => education.resume_id == result.resumeInfo.resume_id);
        var work = this.Context.work_experience.Where((work_experience) => work_experience.resume_id == result.resumeInfo.resume_id);
        result.education = ed.ToArray();
        result.workExperience = work.ToArray();
        result.education.ToList().ForEach((e) => e.Resume = null);
        result.workExperience.ToList().ForEach((e) => e.Resume = null);
        return new ObjectResult(result);
    }

}