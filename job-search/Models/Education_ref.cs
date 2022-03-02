using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Education_ref
    {
        [Key]
        public int education_type_id { get; set; }
        [Required]
        public string education_type_name { get; set; }

    }
}