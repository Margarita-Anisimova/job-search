using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class User_company
    {
        [Key]
        [Required]
        public int user_id { get; set; }

        [ForeignKey("user_id")]
        public User User { get; set; }
        [Required]
        public int company_id { get; set; }
        [ForeignKey("company_id")]
        public Company Company { get; set; }
        [Required]
        public bool main { get; set; }

    }
}