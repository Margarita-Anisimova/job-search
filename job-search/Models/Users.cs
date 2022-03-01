using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
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
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int user_id { get; set; }
        [Required]
        public string email { get; set; }

        [DataType(DataType.Password)]
        [Required]
        public string password {get; set; }

        [Required]
        public string f_name { get; set; }

        [Required]
        public string l_name { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Required]
        public string phone_number {get; set; }
        [Required]
        public user_type? user_type {get; set; }

        public virtual ICollection<Company> Companies { get; set; }

        // +Resumes
    }
}


