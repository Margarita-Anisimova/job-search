using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class RespomsesVacancy
    {
        [Key]
        public int resume_id { get; set; }

        [ForeignKey("resume_id")]
        public Resume Resume { get; set; }
        [Key]
        public int vacancy_id { get; set; }

        [ForeignKey("vacancy_id")]
        public Vaacancy Vaacancy { get; set; }

    }
}