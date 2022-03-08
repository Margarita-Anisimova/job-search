using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Education_ref
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int education_type_id { get; set; }
        [Required]
        public string education_type_name { get; set; }


        public Education_ref(string education_type_name)
        {
            this.education_type_name = education_type_name;
        }
    }
}