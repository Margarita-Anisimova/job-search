using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Company
    {
        [Required]
        public int user_id { get; set; }

        [ForeignKey("user_id")]
        public User User { get; set; }
        [Key]
        public int company_id { get; set; }

        [Required]
        public string fullname { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string description { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Required]
        public string phone { get; set; }
        [Required]
        public string email { get; set; }
    }
}