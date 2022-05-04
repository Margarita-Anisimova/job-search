using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Vacancy
    {
        [Key]
        public int vacancy_id { get; set; }

        // [ForeignKey("user_id")]
        // public User User { get; set; }
        [Required]
        public int company_id { get; set; }
        [ForeignKey("company_id")]
        public Company Company { get; set; }
        public string status { get; set; }

        [Required]
        public string position { get; set; }

        [Required]
        public int profession_id { get; set; }
        [ForeignKey("profession_id")]
        public Profession_ref profession_ref { get; set; }

        [Required]
        public string work_experience { get; set; }


        public string education_level { get; set; }

        [Required]
        public string salary { get; set; }

        public string work_type { get; set; }
        [Required]
        public string work_address { get; set; }
        [Required]
        public string responsibilities { get; set; }
        [Required]
        public string requirements { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime publication_date { get; set; }

    }
}