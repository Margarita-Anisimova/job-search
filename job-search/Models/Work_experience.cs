using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Work_Experience
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        public Work_Experience(string post, string company, string date_start, string date_end, string experience_description, int resume_id){
            this.post = post;
            this.company = company;
            this.date_start = date_start;
            this.date_end = date_end;
            this.experience_description = experience_description;
            this.resume_id = resume_id;
        }
    }
}