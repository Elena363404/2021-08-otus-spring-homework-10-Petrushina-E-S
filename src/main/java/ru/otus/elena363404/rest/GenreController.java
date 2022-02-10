package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Genre;
import ru.otus.elena363404.service.GenreService;

import java.util.List;


@RestController
@AllArgsConstructor
public class GenreController {
  private final GenreService genreService;

  @PutMapping("/api/genre/{id}")
  public Genre editGenre(@RequestBody Genre genre) {
    Genre saved = genreService.saveGenre(genre);
    return saved;
  }

  @DeleteMapping("/api/genre/{id}")
  public String deleteGenre(@PathVariable("id") long id) {
    genreService.deleteGenre(id);
    return "redirect:/";
  }

  @GetMapping("/api/genre")
  public List<Genre> getAllGenre() {
    return genreService.getAllGenre();
  }
}
