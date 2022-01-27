package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Genre;
import ru.otus.elena363404.service.GenreService;

import java.util.List;


@RestController
@AllArgsConstructor
public class GenreController {
  private final GenreService genreService;

  @PutMapping("/genre/{id}")
  public String editGenre(@RequestBody Genre genre, Model model) {
    Genre saved = genreService.saveGenre(genre);
    model.addAttribute(saved);
    return "redirect:/";
  }

  @DeleteMapping("/genre/{id}")
  public String deleteGenre(@PathVariable("id") long id) {
    genreService.deleteGenre(id);
    return "redirect:/";
  }

  @GetMapping("/api/genres")
  public List<Genre> getAllGenre() {
    return genreService.getAllGenre();
  }
}
