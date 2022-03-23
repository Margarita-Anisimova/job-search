using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Work_Experience
    {
        [Key]
        public int work_experience_id { get; set; }
        [Required]
        public string post { get; set; }
        [Required]
        public string company { get; set; }
        [Required]
        public string date_start { get; set; }
        [Required]
        public string date_end { get; set; }

        [Required]
        public string experience_description { get; set; }
        [Required]
        public int resume_id { get; set; }
        [ForeignKey("resume_id")]
        public Resume Resume { get; set; }


    }
}