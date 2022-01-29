package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
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

  @PutMapping("/api/book/{id}")
  public BookDto editBook(@RequestBody BookDto bookDto) {
    Book book = bookDtoToBook(bookDto);
    Book saved = bookService.saveBook(book);
    return bookToBookDto(saved);
  }

  @PostMapping("/api/book")
  public Book addBook(@RequestBody BookDto bookDto) {
    Book book = bookDtoToBook(bookDto);
    Book saved = bookService.saveBook(book);
    return saved;
  }

  @DeleteMapping("/api/book/{id}")
  public void deleteBook(@PathVariable("id") long id) {
    bookService.deleteBook(id);
  }

  @GetMapping("/api/book")
  public List<BookDto> getAllBooks() {
    return bookService.getAllBook().stream().map(BookDto::bookToBookDto).collect(Collectors.toList());
  }

}
