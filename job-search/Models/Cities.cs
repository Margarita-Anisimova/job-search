using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Cities
    {
        [Key]
        public int city_id { get; set; }
        [Required]
        public string city { get; set; }

    }
}