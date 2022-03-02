using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Education
    {
        [Key]
        public int education_id { get; set; }
        [Required]
        public string institution { get; set; }
        [Required]
        public string graduation_year { get; set; }
        [Required]
        public string education_type_id { get; set; }
        [ForeignKey("education_type_id")]
        public Education_ref education_ref { get; set; }
        [Required]
        public string resume_id { get; set; }
        [ForeignKey("resume_id")]
        public Resume Resume { get; set; }


    }
}