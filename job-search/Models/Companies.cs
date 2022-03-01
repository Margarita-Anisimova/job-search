using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace job_search.Models
{
    public class Company
    {
        public int user_id { get; set; } 

        [ForeignKey(nameof(user_id))] 
        public virtual User User { get; set; } 
        [Key]
        public int company_id { get; set; }

        [Required]
        public string fullname {get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string description { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Required]
        public string phone {get; set; }
        [Required]
        public string email {get; set; }
    }
}


