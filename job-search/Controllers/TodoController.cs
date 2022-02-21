using System.Collections.Generic;
using job_search;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
public class TodoController : Controller
{
    ITodoRepository TodoRepository;

    public TodoController(ITodoRepository todoRepository)
    {
        TodoRepository = todoRepository;
    }

    [HttpGet(Name = "GetAllItems")]
    public IEnumerable<TodoItem> Get()
    {
        return TodoRepository.Get();
    }

    [HttpGet("{id}", Name = "GetTodoItem")]
    public IActionResult Get(int Id)
    {
        TodoItem todoItem = TodoRepository.Get(Id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return new ObjectResult(todoItem);
    }

    [HttpPost]
    public IActionResult Create([FromBody] TodoItem todoItem)
    {
        if (todoItem == null)
        {
            return BadRequest();
        }
        TodoRepository.Create(todoItem);
        return CreatedAtRoute("GetTodoItem", new { id = todoItem.Id }, todoItem);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int Id, [FromBody] TodoItem updatedTodoItem)
    {
        if (updatedTodoItem == null || updatedTodoItem.Id != Id)
        {
            return BadRequest();
        }

        var todoItem = TodoRepository.Get(Id);
        if (todoItem == null)
        {
            return NotFound();
        }

        TodoRepository.Update(updatedTodoItem);
        return RedirectToRoute("GetAllItems");
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int Id)
    {
        var deletedTodoItem = TodoRepository.Delete(Id);

        if (deletedTodoItem == null)
        {
            return BadRequest();
        }

        return new ObjectResult(deletedTodoItem);
    }
}