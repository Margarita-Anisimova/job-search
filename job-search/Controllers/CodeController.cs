using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class CodeController : Controller
{
    private EFTodoDBContext Context;

    public CodeController(EFTodoDBContext db)
    {
        this.Context = db;
    }

    public class CodeResponse
    {
        public string Code { get; set; }
        public bool Error { get; set; }
    }

    [HttpGet]
    [Route("{email}")]
    public CodeResponse GetCode(string email)
    {
        var response = new CodeResponse();
        var a = this.Context.users.Where((user) => user.email == email);
        if (a.Count() > 0)
        {
            response.Error = true;
            return response;
        }

        var rng = new Random();
        var code = "";
        for (var i = 0; i < 5; i++)
        {
            code += rng.Next(1, 10);
        }
        response.Code = code;
        // SendEmailAsync(email, code);
        return response;
    }

    private static async void SendEmailAsync(string email, string code)
    {
        MailAddress from = new MailAddress("flashCardsCheckEmail@gmail.com", "Работа всем");
        MailAddress to = new MailAddress(email);
        MailMessage m = new MailMessage(from, to);
        m.Subject = "Код подтверждения";
        m.Body = $"Код для подтверждения учетной записи: {code}";
        SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
        smtp.Credentials = new NetworkCredential("flashCardsCheckEmail@gmail.com", "Flash123456)");
        smtp.EnableSsl = true;
        await smtp.SendMailAsync(m);
    }

}