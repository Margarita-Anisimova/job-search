using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Education
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int education_id { get; set; }
        [Required]
        public string institution { get; set; }
        [Required]
        public string graduation_year { get; set; }

        [Required]
        public string faculty { get; set; }

        [Required]
        public string specialization { get; set; }

        [Required]
        public string education_type { get; set; }

        [Required]
        public int resume_id { get; set; }
        [ForeignKey("resume_id")]
        public Resume Resume { get; set; }


        public Education(string institution, string graduation_year, string faculty, string specialization, string education_type, int resume_id )
        {
            this.institution = institution;
            this.graduation_year = graduation_year;
            this.faculty = faculty;
            this.specialization = specialization;
            this.education_type = education_type;
            this.resume_id = resume_id;
        }

    }
}