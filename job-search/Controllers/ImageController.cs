using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using job_search;
using job_search.Models;
using Microsoft.AspNetCore.Mvc;
using static ResponseToResumeController;

[Route("[controller]")]
public class ImageController : Controller
{
    private EFTodoDBContext Context;

    public ImageController(EFTodoDBContext db)
    {
        this.Context = db;
    }


    [HttpPost]
    [Produces("application/json", "application/xml")]
    public void Post([FromBody] UserImage image)
    {
        byte[] d = ConverToByteArr(image.image);
        var t = new Image() { user_id = image.user_id, image = d };
        if (this.Context.image.Any((im) => im.user_id == image.user_id))
            this.Context.image.Update(t);
        else
            this.Context.image.Add(t);
        this.Context.SaveChanges();
    }

    protected byte[] ConverToByteArr(string u)
    {
        string base64 = u;
        Byte[] bitmapData = new Byte[base64.Length];
        bitmapData = Convert.FromBase64String(FixBase64ForImage(base64));

        return bitmapData;
    }

    protected static string FixBase64ForImage(string image)
    {
        StringBuilder sbText = new StringBuilder(image, image.Length);
        sbText.Replace("\r\n", String.Empty);
        sbText.Replace(" ", String.Empty);
        sbText.Replace("data:image/jpg;base64,", String.Empty);
        sbText.Replace("data:image/jpeg;base64,", String.Empty);
        sbText.Replace("data:image/png;base64,", String.Empty);
        return sbText.ToString();
    }

    [Route("{user_id}")]
    [HttpGet]
    public UserImage Get(int user_id)
    {

        var d = this.Context.image.Where((r) => r.user_id == user_id);
        if (d.Count() != 0)
        {
            var tg = Convert.ToBase64String(d.First().image);
            return new UserImage() { user_id = d.First().user_id, image = tg };
        }
        else
        {
            return new UserImage();
        }

    }

    [HttpDelete]
    public void Delete([FromBody] int user_id)
    {
        var ed = this.Context.image.Where((res) => res.user_id == user_id).First();
        this.Context.image.Remove(ed);
        this.Context.SaveChanges();

    }

    public class UserImage
    {
        public string image { get; set; }
        public int user_id { get; set; }
    }
}
