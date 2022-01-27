package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Book;
import ru.otus.elena363404.domain.Comment;
import ru.otus.elena363404.rest.dto.BookDto;
import ru.otus.elena363404.rest.dto.CommentDto;
import ru.otus.elena363404.service.BookService;
import ru.otus.elena363404.service.CommentService;

import java.util.List;
import java.util.stream.Collectors;

import static ru.otus.elena363404.rest.dto.CommentDto.commentDtoToComment;
import static ru.otus.elena363404.rest.dto.CommentDto.commentToCommentDto;

@RestController
@AllArgsConstructor
public class CommentController {

  private final CommentService commentService;
  private final BookService bookService;

  @GetMapping("/edit_comment/{id}")
  public String getCommentById(@PathVariable("id") long id, Model model) {
    CommentDto commentDto = commentToCommentDto(commentService.getCommentById(id));

    model.addAttribute("comment", commentDto);
    return "edit_comment";
  }

  @PutMapping("/comment/{id}")
  public String saveComment(@RequestBody CommentDto commentDto, Model model) {
    Comment comment = commentDtoToComment(commentDto);
    Comment saved = commentService.saveComment(comment);
    model.addAttribute(commentToCommentDto(saved));

    return "redirect:/";
  }

  @DeleteMapping("/comment/{id}")
  public String deleteComment(@PathVariable("id") long id) throws Exception {
    commentService.deleteComment(id);
    return "redirect:/";
  }

  @GetMapping("/api/comments")
  public List<CommentDto> getAllComments() {
    return commentService.getAllComment().stream().map(CommentDto::commentToCommentDto).collect(Collectors.toList());
  }
}
