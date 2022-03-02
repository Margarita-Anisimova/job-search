using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Vaacancy
    {
        [Key]
        public int vacancy_id { get; set; }

        // [ForeignKey("user_id")]
        // public User User { get; set; }
        [Required]
        public int company_id { get; set; }
        [ForeignKey("company_id")]
        public Company Company { get; set; }

        [Required]
        public string vacancy_name { get; set; }

        [Required]
        public string position { get; set; }

        [Required]
        public string profession_id { get; set; }
        [ForeignKey("profession_id")]
        public Profession_ref profession_ref { get; set; }

        [Required]
        public string work_experience { get; set; }

        [Required]
        public int education_type_id { get; set; }
        [ForeignKey("education_type_id")]
        public Education_ref education_ref { get; set; }
        [Required]
        public int salary { get; set; }

        public int work_type_id { get; set; }
        [ForeignKey("work_type_id")]
        public Work_type_ref Work_type_ref { get; set; }

        public int workingconditions_id { get; set; }
        [ForeignKey("work_type_id")]
        public Workingconditions_ref workingconditions_ref { get; set; }

        public string work_address { get; set; }
        public string responsibilities { get; set; }
        [Required]
        public string requirements { get; set; }

    }
}