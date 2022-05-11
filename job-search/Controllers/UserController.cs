using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class UserController : Controller
{
    private EFTodoDBContext Context;

    public UserController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    public class UserResponce
    {
        public int user_id { get; set; }
        public string user_type { get; set; }

    }

    public class CompanyResponce
    {
        public CompanyFull company { set; get; }
        public User user { set; get; }
    }


    public class CompanyFull
    {
        public Company companyInfo { get; set; }
        public Vacancy[] vacancies { get; set; }

    }

    public class ResumeCard
    {
        public FullResume resume { set; get; }

        public User user { set; get; }
    }

    public class FullResume
    {
        public Resume resumeInfo { set; get; }
        public Education[] education { set; get; }
        public Work_Experience[] workExperience { set; get; }
    }

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public IActionResult Post([FromBody] User data)
    {
        this.Context.users.Add(data);
        this.Context.SaveChanges();
        var d = this.Context.users.OrderBy((e) => e.user_id).Last();
        return new ObjectResult(new UserResponce { user_id = d.user_id, user_type = d.user_type });
    }

    public class Worker
    {
        public User user { get; set; }
        public int company_id { get; set; }
        public string role { get; set; }
    }

    [Route("newWorker")]
    [HttpPost]
    [Produces("application/json", "application/xml")]
    public IActionResult PostNewWorker([FromBody] Worker data)
    {
        this.Context.users.Add(data.user);
        this.Context.SaveChanges();
        var d = this.Context.users.OrderBy((e) => e.user_id).Last();
        // var param = this.Context.user_company.Find(d.user_id);
        // if (param is null)
        // {
        //     return new StatusCodeResult(400);
        // }
        this.Context.user_company.Add(new User_company() { user_id = d.user_id, company_id = data.company_id, role = data.role });
        this.Context.SaveChanges();
        return new OkResult();
    }

    [HttpPut]
    // [Produces("application/json")]

    public void Put([FromBody] User data)
    {
        this.Context.users.Update(data);
        this.Context.SaveChanges();
    }
    /// <summary>
    /// Get Profile data by email and password
    /// </summary>
    /// <returns>Profile Data</returns>
    /// <response code="200">User exists and entered the correct password</response>
    /// <response code="404">User not found</response>
    /// <response code="400">The password is incorrect</response>
    [Route("{email}/{password}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Get(string email, string password)
    {
        var a = this.Context.users.Where((user) => user.email == email);
        if (a.Count() != 0 && CheckPassword(password, a.First().password))
        {
            switch (a.First().user_type)
            {
                case "admin":
                    {
                        return new ObjectResult(a.First());
                    }
                case "applicant":
                    {
                        var res = GetResume(a.First());
                        return new ObjectResult(res);
                    }
                case "employer":
                    {
                        var res = GetCompany(a.First());
                        return new ObjectResult(res);
                    }
                default:
                    {
                        return NotFound(); ;
                    }
            }
        }
        else
        {
            return NotFound();
        }

    }

    protected ResumeCard GetResume(User a)
    {
        var result = new ResumeCard();
        result.user = a;
        var res = new FullResume();
        var resumeFromBase = this.Context.resumes.Where(e => e.user_id == result.user.user_id).FirstOrDefault();
        if (resumeFromBase is not null)
        {
            if ((DateTime.Today - resumeFromBase.publication_date).Days <= 14)
            {
                resumeFromBase.status = "dat";
            }
            resumeFromBase.User = null;
            res.resumeInfo = resumeFromBase;
            var ed = this.Context.education.Where((education) => education.resume_id == res.resumeInfo.resume_id);
            var work = this.Context.work_experience.Where((work_experience) => work_experience.resume_id == res.resumeInfo.resume_id);
            res.education = ed.ToArray();
            res.workExperience = work.ToArray();
            res.education.ToList().ForEach((e) => e.Resume = null);
            res.workExperience.ToList().ForEach((e) => e.Resume = null);
            result.resume = res;
            result.user.password = "";
        }
        return result;
    }


    protected CompanyResponce GetCompany(User a)
    {
        var responce = new CompanyResponce();
        responce.user = a;
        responce.company = new CompanyFull();
        var user_company = this.Context.user_company.Find(responce.user.user_id);
        if (user_company is not null)
        {
            responce.company.companyInfo = this.Context.companies.Find(user_company.company_id);
            var vacancies = this.Context.vacancies.Where((v) => v.company_id == responce.company.companyInfo.company_id).ToList();
            vacancies.ForEach((item) => item.status = (DateTime.Today - item.publication_date).Days <= 14 ? "dat" : item.status);
            responce.company.vacancies = vacancies.ToArray();
        }
        return responce;
    }
    protected bool CheckPassword(string password, string passwordFromBase)
    {
        var a = password.Split(' ');
        var b = passwordFromBase.Split(' ');
        var c = a.Length / 2;
        var d = a.Length / 2;
        if (c != d)
            return false;
        for (var i = 0; i < c; i++)
        {
            var t = Convert.ToInt32(a[i], 16) ^ Convert.ToInt16(a[i + c], 16);
            var f = Convert.ToInt32(b[i], 16) ^ Convert.ToInt16(b[i + c], 16);
            if (t != f)
            {
                return false;
            }
        }
        return true;
    }
}