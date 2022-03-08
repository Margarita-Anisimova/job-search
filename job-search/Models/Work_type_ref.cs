using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Work_type_ref
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int work_type_id { get; set; }
        [Required]
        public string work_type_name { get; set; }


        public Work_type_ref(string work_type_name)
        {
            this.work_type_name = work_type_name;
        }

    }
}