using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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

    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] User data)
    {
        this.Context.users.Add(data);
        this.Context.SaveChanges();
    }

    public class UserResponse
    {
        public User User { get; set; }
        public bool Error { get; set; }
    }


    [Route("{email}/{password}")]
    [HttpGet]
    public UserResponse Get(string email, string password)
    {
        var response = new UserResponse();
        var a = this.Context.users.Where((user) => user.email == email);
        if (a.Count() == 0)
        {
            response.Error = true;
        }
        else if (a.First().password == password)
        {
            response.User = a.First();
        }
        else
        {
            response.Error = true;
        }
        return response;
    }

}

