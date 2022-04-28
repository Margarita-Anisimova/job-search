using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;


namespace job_search.Models
{
    public class Image
    {
        [Key]
        public int user_id { get; set; }
        [Column(TypeName = "image")]
        public byte[] image { get; set; }

    }
}