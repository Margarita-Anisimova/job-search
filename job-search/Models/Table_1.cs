using System.ComponentModel.DataAnnotations;

public class Table_1
{
    [Key]
    public int id { get; set; }
    [Required]
    public string name { get; set; }
}