package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Book;
import ru.otus.elena363404.rest.dto.BookDto;
import ru.otus.elena363404.service.BookService;

import java.util.List;
import java.util.stream.Collectors;

import static ru.otus.elena363404.rest.dto.BookDto.bookDtoToBook;
import static ru.otus.elena363404.rest.dto.BookDto.bookToBookDto;

@RestController
@AllArgsConstructor
public class BookController {
  private final BookService bookService;

  @PutMapping("/book/{id}")
  public String editBook(@RequestBody BookDto bookDto, Model model) {
    Book book = bookDtoToBook(bookDto);
    Book saved = bookService.saveBook(book);
    model.addAttribute(bookToBookDto(saved));
    return "redirect:/";
  }

  @PostMapping("/book")
  public String addBook(@RequestBody BookDto bookDto, Model model) {
    Book book = bookDtoToBook(bookDto);
    Book saved = bookService.saveBook(book);
    model.addAttribute(bookToBookDto(saved));
    return "redirect:/";
  }

  @DeleteMapping("/book/{id}")
  public String deleteBook(@PathVariable("id") long id) throws Exception {

    bookService.deleteBook(id);
    return "redirect:/";
  }

  @GetMapping("/api/books")
  public List<BookDto> getAllBooks() {
    return bookService.getAllBook().stream().map(BookDto::bookToBookDto).collect(Collectors.toList());
  }

}
