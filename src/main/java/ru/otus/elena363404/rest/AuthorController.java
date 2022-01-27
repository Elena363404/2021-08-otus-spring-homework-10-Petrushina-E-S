package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Author;
import ru.otus.elena363404.service.AuthorService;

import java.util.List;

@RestController
@AllArgsConstructor
public class AuthorController {

  private final AuthorService authorService;

  @PutMapping("/author/{id}")
  public String editAuthor(@RequestBody Author author, Model model) {
    Author saved = authorService.saveAuthor(author);
    model.addAttribute(saved);
    return "redirect:/";
  }

  @DeleteMapping("/author/{id}")
  public String deleteAuthor(@PathVariable("id") long id)  {
    authorService.deleteAuthor(id);
    return "redirect:/";
  }

  @GetMapping("/api/authors")
  public List<Author> getAllAuthors() {
    return authorService.getAllAuthor();
  }

}
