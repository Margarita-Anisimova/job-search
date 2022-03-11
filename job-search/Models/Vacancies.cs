using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Vacancy
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int vacancy_id { get; set; }

        [Required]
        public int company_id { get; set; }
        [ForeignKey("company_id")]
        public Company Company { get; set; }

        // [Required]
        public string vacancy_name { get; set; }

        // [Required]
        public string position { get; set; }

        // [Required]
        public string profession{ get; set; }

        // [Required]
        public string work_experience { get; set; }

        // [Required]
        public string education { get; set; }
 
        // [Required]
        public int salary { get; set; }

        public string work_type { get; set; }
 
        public string work_address { get; set; }
        public string responsibilities { get; set; }
        // [Required]
        public string requirements { get; set; }

        public Vacancy(string vacancy_name, string position, string profession, string work_experience,
        string education, int salary, string work_type, string work_address,
        string responsibilities, string requirements, int company_id)
        {
            this.vacancy_name = vacancy_name;
            this.position = position;
            this.profession = profession;
            this.work_experience = work_experience;
            this.education = education;
            this.salary = salary;
            this.work_type = work_type;
            this.work_address = work_address;
            this.responsibilities = responsibilities;
            this.requirements = requirements;
            this.company_id = company_id;
        }

    }
}