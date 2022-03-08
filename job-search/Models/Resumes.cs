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

        // [Required]
        public string city { get; set; }

        // [Required]
        public string citizenship { get; set; }

        [DataType(DataType.DateTime)]
        // [Required]
        public string birth_date { get; set; }
        // [Required]
        public string desired_position { get; set; }


        public int desired_salary { get; set; }

        public string work_type { get; set; }

        public string ready_move { get; set; }
        public string skills { get; set; }
        // [Required]
        public string profession{ get; set; }

        // public string education_level { get; set; }

        public Resume(int user_id, string city, string citizenship, string birth_date, string desired_position, int desired_salary, string work_type,
        string ready_move, string skills, string profession ){

            this.user_id = user_id;
            this.city = city;
            this.citizenship = citizenship;
            this.birth_date = birth_date;
            this.desired_position = desired_position;
            this.desired_salary = desired_salary;
            
            this.work_type = work_type;

            this.ready_move = ready_move;
            this.skills = skills;

            this.profession = profession;
        }

    }
}