using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Work_type_ref
    {
        [Key]
        public int work_type_id { get; set; }
        [Required]
        public string work_type_name { get; set; }

    }
}