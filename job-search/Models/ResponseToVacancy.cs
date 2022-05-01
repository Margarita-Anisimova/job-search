using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class ResponseToVacancy
    {
        [Key]
        public int resume_id { get; set; }

        [ForeignKey("resume_id")]
        public Resume Resume { get; set; }
        [Key]
        public int vacancy_id { get; set; }

        [ForeignKey("vacancy_id")]
        public Vacancy Vacancy { get; set; }

        public string response { get; set; }

        public string message { get; set; }
        // public bool status { get; set; }
        [DataType(DataType.Date)]
        [Required]
        public DateTime publication_date { get; set; }
    }
}