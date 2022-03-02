using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Resume
    {
        [Required]
        public int user_id { get; set; }

        [ForeignKey("user_id")]
        public User User { get; set; }
        [Key]
        public int resume_id { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string citizenship { get; set; }

        [DataType(DataType.DateTime)]
        [Required]
        public string birth_date { get; set; }
        [Required]
        public string desired_position { get; set; }


        public int desired_salary { get; set; }

        public int work_type_id { get; set; }
        [ForeignKey("work_type_id")]
        public Work_type_ref Work_type_ref { get; set; }

        public int ready_move { get; set; }
        public string skills { get; set; }
        [Required]
        public int profession_id { get; set; }
        [ForeignKey("profession_id")]
        public Profession_ref Profession_ref { get; set; }


    }
}