using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class ResponseToResume
    {
        [Key]
        public int vacancy_id { get; set; }

        [ForeignKey("vacancy_id")]
        public Vacancy vacancy { get; set; }

        [Key]
        public int resume_id { get; set; }

        [ForeignKey("resume_id")]
        public Resume resume { get; set; }

        [Required]
        public string message { get; set; }

    }
}