using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace job_search.Models
{
    public enum user_type
    {
        A, B, C
    }

    public class User
    {
        //, DatabaseGenerated(DatabaseGeneratedOption.Identity)
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int user_id { get; set; }
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string f_name { get; set; }

        [Required]
        public string l_name { get; set; }

        public string phone_number { get; set; }
        [Required]
        public string user_type { get; set; }

        public User(string email, string password, string f_name, string l_name, string phone_number, string user_type)
        {
            this.email = email;
            this.password = password;
            this.f_name = f_name;
            this.l_name = l_name;
            this.phone_number = phone_number;
            this.user_type = user_type;
        }
        // public virtual ICollection<Company> Companies { get; set; }

        // +Resumes
    }
}