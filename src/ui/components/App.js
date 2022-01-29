import React from 'react'
import Book from './Book.js';

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {authors: [], books: [], genres: [], comments: [], newBook: {}};
    }

//    BOOK

    handleEditBookName(id, bookName) {
        var book = this.state.books.find(a => a.id === id);
        book.name = bookName;
        this.setState({books: [...this.state.books]});
    }

    handleEditBookAuthor(id, bookAuthor) {
        var book = this.state.books.find(a => a.id === id);
        book.authorId = bookAuthor;
        this.setState({books: [...this.state.books]});
    }

    handleEditBookGenre(id, bookGenre) {
        var book = this.state.books.find(a => a.id === id);
        book.genreId = bookGenre;
        this.setState({books: [...this.state.books]});
    }

    handleAddBook() {
        fetch(`/api/book`,
            {method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(this.state.newBook)
             })
             .then(() => this.refreshBooks())
             .then(() => this.refreshNewBook());
    }

    handleSaveBook(id) {
        var book = this.state.books.find(a => a.id === id);
        fetch(`/api/book/${id}`,
            {method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(book)
             })
             .then(() => this.refreshBooks());
    }

    handleDeleteBookRow(id) {
        fetch(`/api/book/${id}`, {method: 'DELETE'})
            .then(() => this.refreshBooks())
            .then(() => this.refreshComments());
    }

    refreshBooks() {
        fetch('/api/book')
            .then(response => response.json())
            .then(books => this.setState({books}));
    }

    refreshNewBook() {
        this.setState({newBook:{name:null, authorId: null, genreId: null}});
    }

    setNewBookName(name) {
        var newBook = this.state.newBook;
        newBook.name = name;
        this.setState({newBook});
    }

    setNewBookAuthor(authorId) {
        var newBook = this.state.newBook;
        newBook.authorId = authorId;
        this.setState({newBook});
    }

    setNewBookGenre(genreId) {
        var newBook = this.state.newBook;
        newBook.genreId = genreId;
        this.setState({newBook});
    }

//    AUTHOR
    handleEditAuthor(id, authorName) {
        var author = this.state.authors.find(a => a.id === id);
        author.name = authorName;
        this.setState({authors: [...this.state.authors]});
    }

    handleSaveAuthor(id) {
        var author = this.state.authors.find(a => a.id === id);
        fetch(`/api/author/${id}`,
            {method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(author)
             })
             .then(() => this.refreshAuthors())
             .then(() => this.refreshBooks());
    }

    handleDeleteAuthorRow(id) {
        fetch(`/api/author/${id}`, {method: 'DELETE'})
            .then(() => this.refreshAuthors())
            .then(() => this.refreshBooks());
    }

    refreshAuthors() {
        fetch('/api/author')
            .then(response => response.json())
            .then(authors => this.setState({authors}));
    }

//    GENRE
    handleEditGenre(id, genreName) {
        var genre = this.state.genres.find(a => a.id === id);
        genre.name = genreName;
        this.setState({genres: [...this.state.genres]});
    }

    handleSaveGenre(id) {
        var genre = this.state.genres.find(a => a.id === id);
        fetch(`/api/genre/${id}`,
            {method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(genre)
             })
             .then(() => this.refreshGenres())
             .then(() => this.refreshBooks());
    }

    handleDeleteGenreRow(id) {
        fetch(`/api/genre/${id}`, {method: 'DELETE'})
            .then(() => this.refreshGenres())
            .then(() => this.refreshBooks());
    }

    refreshGenres() {
        fetch('/api/genre')
            .then(response => response.json())
            .then(genres => this.setState({genres}));
    }

//    COMMENT
    handleEditComment(id, commentTxt) {
        var comment = this.state.comments.find(a => a.id === id);
        comment.comment = commentTxt;
        this.setState({comments: [...this.state.comments]});
    }

    handleEditCommentBook(id, book) {
        var comment = this.state.comments.find(a => a.id === id);
        comment.bookId = book;
        this.setState({comments: [...this.state.comments]});
    }

    handleSaveComment(id) {
        var comment = this.state.comments.find(a => a.id === id);
        fetch(`/api/comment/${id}`,
            {method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(comment)
             })
             .then(() => this.refreshComments());
    }

    handleDeleteCommentRow(id) {
        fetch(`/api/comment/${id}`, {method: 'DELETE'})
            .then(() => this.refreshComments());
    }

    refreshComments() {
        fetch('/api/comment')
            .then(response => response.json())
            .then(comments => this.setState({comments}));
    }

// Load Main Page
    componentDidMount() {
        this.refreshBooks();
        this.refreshAuthors();
        this.refreshGenres();
        this.refreshComments();
    }


    render() {
        return (
            <React.Fragment>
                <div class="blok-common">
                    <div class="blok-1">
                        <Book authors={this.state.authors} genres={this.state.genres} refreshComments={this.refreshComments.bind(this)}
                             refreshBookInApp={this.refreshBooks.bind(this)}/>

                        <div class="blok-comment">
                            <Header title={'Comments'}/>
                            <table class="comment">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Comment</th>
                                    <th>Book</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.comments.map((comment, i) => (
                                        <tr key={i}>
                                            <td>{comment.id}</td>
                                            <td><input value={comment.comment} onChange={(e) => this.handleEditComment(comment.id, e.target.value)}/></td>
                                            <td>                                              <select value={comment.bookId} onChange={(e) => this.handleEditCommentBook(comment.id, e.target.value)}>
                                            {this.state.books.map((book) => (
                                                <option value={book.id}>{book.name}</option>
                                              ))}
                                                </select>
                                            </td>
                                            <td><button class="button btn_edit" onClick={(e) => this.handleSaveComment(comment.id)}>OK</button>

                                            <button class="button btn_delete" onClick={(e) => this.handleDeleteCommentRow(comment.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="blok-2">
                        <div class="blok-author">
                            <Header title={'Authors'}/>
                            <table class="author">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.authors.map((author, i) => (
                                        <tr key={i}>
                                            <td>{author.id}</td>
                                            <td><input value={author.name} onChange={(e) => this.handleEditAuthor(author.id, e.target.value)}/></td>

                                            <td><button class="button btn_edit" onClick={(e) => this.handleSaveAuthor(author.id)}>OK</button>

                                            <button class="button btn_delete" onClick={(e) => this.handleDeleteAuthorRow(author.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>

                        <div class="blok-genre">
                        <Header title={'Genres'}/>
                            <table class="genre">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.genres.map((genre, i) => (
                                        <tr key={i}>
                                            <td>{genre.id}</td>
                                            <td><input value={genre.name} onChange={(e) => this.handleEditGenre(genre.id, e.target.value)}/></td>
                                            <td><button class="button btn_edit" onClick={(e) => this.handleSaveGenre(genre.id)}>OK</button>
                                            <button class="button btn_delete" onClick={(e) => this.handleDeleteGenreRow(genre.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
};
