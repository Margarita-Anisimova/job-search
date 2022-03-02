using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Workingconditions_ref
    {
        [Key]
        public int workingconditions_id { get; set; }
        [Required]
        public string workingconditions_name { get; set; }

    }
}