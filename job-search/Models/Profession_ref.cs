using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Profession_ref
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int profession_id { get; set; }
        [Required]
        public string profession { get; set; }

        public Profession_ref(string profession)
        {
            this.profession = profession;
        }
    }
}