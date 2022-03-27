using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class SelectedVacancy
    {
        [Key]
        public int user_id { get; set; }

        [ForeignKey("user_id")]
        public User User { get; set; }
        [Key]
        public int vacancy_id { get; set; }

        [ForeignKey("vacancy_id")]
        public Vacancy Vacancy { get; set; }

    }
}