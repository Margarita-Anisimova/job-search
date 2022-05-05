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
public class ResumeController : Controller
{
    private EFTodoDBContext Context;

    public ResumeController(EFTodoDBContext db)
    {
        this.Context = db;
        DbInterceptors.Init();
    }

    public class ResumeCard
    {
        public FullResume resume { set; get; }

        public User user { set; get; }
        public string image { get; set; }
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
        resume.resumeInfo.publication_date = DateTime.Today;
        foreach (var ex in resume.workExperience)
        {
            resume.resumeInfo.work_experience = 0;
            resume.resumeInfo.work_experience += Int32.Parse(ex.date_end) - Int32.Parse(ex.date_start);
        }
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

    [HttpPut]
    [Produces("application/json", "application/xml")]
    public void Put([FromBody] FullResume resume)
    {
        resume.resumeInfo.publication_date = DateTime.Today;
        foreach (var ex in resume.workExperience)
        {
            resume.resumeInfo.work_experience = 0;
            resume.resumeInfo.work_experience += Int32.Parse(ex.date_end) - Int32.Parse(ex.date_start);
        }
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
        this.Context.SaveChanges();
    }


    [Route("{user_id}")]
    [HttpGet]

    public IActionResult Get(int user_id)
    {
        var a = this.Context.resumes.Where((resume) => resume.user_id == user_id);
        var result = new ResumeCard();
        if (a.Count() == 0)
        {
            result.user = this.Context.users.Where((user) => user.user_id == user_id).First();
            return new ObjectResult(result);
        }

        result.resume = new FullResume();
        result.resume.resumeInfo = a.First();
        var ed = this.Context.education.Where((education) => education.resume_id == result.resume.resumeInfo.resume_id);
        var work = this.Context.work_experience.Where((work_experience) => work_experience.resume_id == result.resume.resumeInfo.resume_id);
        result.resume.education = ed.ToArray();
        result.resume.workExperience = work.ToArray();
        result.resume.education.ToList().ForEach((e) => e.Resume = null);
        result.resume.workExperience.ToList().ForEach((e) => e.Resume = null);
        result.user = this.Context.users.Where((user) => user.user_id == a.First().user_id).First();
        var d = this.Context.image.Where((r) => r.user_id == user_id).FirstOrDefault();
        if (d != null)
            result.image = Convert.ToBase64String(d.image);
        return new ObjectResult(result);
    }

    [HttpGet]
    public List<Resume> Get()
    {
        var param = HttpContext.Request.Query;
        var result = new List<Resume>();
        if (param["admin"] == "true")
        {
            return this.Context.resumes.Where(res => res.status == "add").ToList();
        }

        if (Int32.Parse(param["profession_id"]) != 0)
            result = this.Context.resumes.Where((resume) => resume.profession_id == Int32.Parse(param["profession_id"]) && resume.status == "pub").ToList();
        else
        {
            var text = @"SELECT * FROM resumes WHERE CONTAINS((desired_position, skills, education_level),'" + param["word"] + @"')";
            result = this.Context.resumes.FromSqlRaw(text).ToList();
        }
        if (result.Count() != 0)
        {
            result = result.Where(resume => resume.city_id == Int32.Parse(param["city_id"])).ToList();
        }
        if (param["education_level"] != "Нет образования" && result.Count() != 0)
            result = result.Where(resume => resume.education_level == param["education_level"]).ToList();

        if (param["work_experience"] != "без опыта" && param["work_experience"] != "" && result.Count() != 0)
            result = result.Where(resume =>
            {
                var t = param["work_experience"].ToString().Split('-');
                var exp = resume.work_experience;
                if (resume.work_experience >= Int32.Parse(t[0]))
                    return true;
                else
                    return false;
            }).ToList();
        if (param["isFilters"] == "true")
        {
            if (param["salary"] != "" && result.Count() != 0)
                result = result.Where(resume => Int32.Parse(resume.desired_salary) <= Int32.Parse(param["salary"]))?.ToList();
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

    [HttpDelete]

    public void Delete([FromBody] int resume_id)
    {
        var res = this.Context.resumes.Where((res) => res.resume_id == resume_id).First();
        this.Context.resumes.Remove(res);
        this.Context.SaveChanges();

    }
}

//var fi = typeof(Resume).GetField(p.Key);
//             object fieldValue = fi.GetValue(resume);
//             return fieldValue == p.Value;