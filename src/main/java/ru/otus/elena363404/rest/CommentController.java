package ru.otus.elena363404.rest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.otus.elena363404.domain.Comment;
import ru.otus.elena363404.rest.dto.CommentDto;
import ru.otus.elena363404.service.CommentService;

import java.util.List;
import java.util.stream.Collectors;

import static ru.otus.elena363404.rest.dto.CommentDto.commentDtoToComment;

@RestController
@AllArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @PutMapping("/api/comment/{id}")
  public Comment editComment(@RequestBody CommentDto commentDto) {
    Comment comment = commentDtoToComment(commentDto);
    Comment saved = commentService.saveComment(comment);
    return saved;
  }

  @PostMapping("/api/comment")
  public Comment addComment(@RequestBody CommentDto commentDto) {
    Comment comment = commentDtoToComment(commentDto);
    Comment saved = commentService.saveComment(comment);
    return saved;
  }

  @DeleteMapping("/api/comment/{id}")
  public void deleteComment(@PathVariable("id") long id) {
    commentService.deleteComment(id);
  }

  @GetMapping("/api/comment")
  public List<CommentDto> getAllComments() {
    return commentService.getAllComment().stream().map(CommentDto::commentToCommentDto).collect(Collectors.toList());
  }
}
