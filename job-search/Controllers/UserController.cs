using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using job_search;
using job_search.Models;
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

    [HttpPut]
    // [Produces("application/json")]

    public void Put([FromBody] User data)
    {
        this.Context.users.Update(data);

        this.Context.SaveChanges();
    }


    /// <summary>
    /// This is the API which will return a customer based on id
    /// </summary>
    /// <param name="email">Customer email</param>
    ///<param name="password">Customer password</param>
    /// <returns>A Customer</returns>

    [Route("{email}/{password}")]
    [HttpGet]
    public IActionResult Get(string email, string password)
    {
        var a = this.Context.users.Where((user) => user.email == email);
        if (a.Count() != 0 && CheckPassword(password, a.First().password))
        {

            if (a.First().user_type == "applicant")
            {
                var result = new ResumeCard();
                result.user = a.First();
                result.user.password = "";
                var res = new FullResume();
                var resumeFromBase = this.Context.resumes.Where((resume) => resume.user_id == result.user.user_id);
                if (resumeFromBase.Count() != 0)
                {
                    res.resumeInfo = resumeFromBase.First();
                    var ed = this.Context.education.Where((education) => education.resume_id == res.resumeInfo.resume_id);
                    var work = this.Context.work_experience.Where((work_experience) => work_experience.resume_id == res.resumeInfo.resume_id);
                    res.education = ed.ToArray();
                    res.workExperience = work.ToArray();
                    res.education.ToList().ForEach((e) => e.Resume = null);
                    res.workExperience.ToList().ForEach((e) => e.Resume = null);
                    result.resume = res;
                }
                return new ObjectResult(result);
            }
            else if (a.First().user_type == "employer")
            {
                var responce = new CompanyResponce();
                responce.user = a.First();
                responce.user.password = "";
                var companyFromBase = this.Context.companies.Where((company) => company.user_id == responce.user.user_id);
                if (companyFromBase.Count() != 0)
                {
                    responce.company = new CompanyFull();
                    responce.company.companyInfo = companyFromBase.First();
                    var vacancies = this.Context.vacancies.Where((v) => v.company_id == responce.company.companyInfo.company_id).ToArray();
                    responce.company.vacancies = vacancies;
                }
                return new ObjectResult(responce);
            }
            else
            {
                return new ObjectResult(a.First());
            }
        }
        else
        {
            return NotFound();
        }

    }
    public bool CheckPassword(string password, string passwordFromBase)
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


    [Route("{user_id}")]
    [HttpGet]
    public User Get(string user_id)
    {
        var a = this.Context.users.Where((user) => user.user_id == Int32.Parse(user_id)).FirstOrDefault();
        a.password = "";
        return a;
    }
}