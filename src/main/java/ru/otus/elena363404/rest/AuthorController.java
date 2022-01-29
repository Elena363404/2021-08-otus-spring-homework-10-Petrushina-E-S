package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Author;
import ru.otus.elena363404.service.AuthorService;

import java.util.List;

@RestController
@AllArgsConstructor
public class AuthorController {

  private final AuthorService authorService;

  @PutMapping("/api/author/{id}")
  public Author editAuthor(@RequestBody Author author) {
    Author saved = authorService.saveAuthor(author);
    return saved;
  }

  @DeleteMapping("/api/author/{id}")
  public void deleteAuthor(@PathVariable("id") long id)  {
    authorService.deleteAuthor(id);
  }

  @GetMapping("/api/author")
  public List<Author> getAllAuthors() {
    return authorService.getAllAuthor();
  }
}
