using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class ResponseToResume
    {
        [Key]
        public int company_id { get; set; }

        [ForeignKey("user_id")]
        public Company company { get; set; }

        [Key]
        public int resume_id { get; set; }

        [ForeignKey("user_id")]
        public Resume resume { get; set; }

        [Required]
        public string message { get; set; }

    }
}