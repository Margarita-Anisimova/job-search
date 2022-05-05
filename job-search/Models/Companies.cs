using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Company
    {
        [Required]
        public int user_id { get; set; }

        [ForeignKey("user_id")]
        public User User { get; set; }
        [Key]
        public int company_id { get; set; }

        [Required]
        public string fullname { get; set; }

        [Required]
        public int city_id { get; set; }
        [ForeignKey("city_id")]
        public Cities Cities { get; set; }

        [Required]
        public string description { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string phone { get; set; }

        public string contact_face { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string tin { get; set; }

        public Company(string fullname, int city_id, string description, string phone, string email, int user_id)
        {
            this.fullname = fullname;
            this.city_id = city_id;
            this.description = description;
            this.phone = phone;
            this.email = email;
            this.user_id = user_id;
        }
    }
}