import React from 'react'

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class Book extends React.Component {

    constructor(props) {
        super();
        this.state = {books: [], newBook: {}};
    }

    componentWillReceiveProps(nextProps) {
      this.setState({books: nextProps.books});
    }

    componentDidMount() {
        this.props.refreshBookInApp();
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
             .then(() => this.props.refreshBookInApp())
             .then(() => this.refreshNewBook());
    }

    handleSaveBook(id) {
        var book = this.state.books.find(a => a.id === id);
        fetch(`/api/book/${id}`,
            {method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(book)
             })
             .then(() => this.props.refreshBookInApp())
             .then(() => this.props.refreshCommentInApp());
    }

    handleDeleteBookRow(id) {
        fetch(`/api/book/${id}`, {method: 'DELETE'})
            .then(() => this.props.refreshBookInApp())
            .then(() => this.props.refreshCommentInApp());
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


    render() {
        return (
            <React.Fragment>
                <div class="blok-book">
                    <Header title={'Books'}/>
                    <table class="book">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        <td></td>
                        <td><input id="bookName" value={this.state.newBook.name}
                        onChange={evt => this.setNewBookName(evt.target.value)}/></td>
                        <td><select id="bookAuthorId" onChange={evt => this.setNewBookAuthor(evt.target.value)} value={this.state.newBook.authorId}>{this.props.authors.map((author) => ( <option value={author.id}>{author.name}</option>))}</select></td>
                        <td><select id="bookGenreId" onChange={evt => this.setNewBookGenre(evt.target.value)}>{this.props.genres.map((genre) => ( <option value={genre.id}>{genre.name}</option>))}</select></td>
                        <td><button class="button btn_add" onClick={(e) => this.handleAddBook()}>Add</button></td>
                        {
                            this.state.books.map((book, i) => (
                                <tr key={i}>
                                    <td>{book.id}</td>
                                    <td><input value={book.name} onChange={(e) => this.handleEditBookName(book.id, e.target.value)}/></td>
                                    <td>
                                       <select value={book.authorId} onChange={(e) => this.handleEditBookAuthor(book.id, e.target.value)}>
                                           {this.props.authors.map((author) => (
                                             <option value={author.id}>{author.name}</option>
                                           ))}
                                       </select>
                                    </td>
                                    <td>
                                        <select value={book.genreId} onChange={(e) => this.handleEditBookGenre(book.id, e.target.value)}>
                                            {this.props.genres.map((genre) => (
                                            <option value={genre.id}>{genre.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><button class="button btn_edit" onClick={(e) => this.handleSaveBook(book.id)}>OK</button>

                                    <button class="button btn_delete" onClick={(e) => this.handleDeleteBookRow(book.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>


            </React.Fragment>
        )
    }
};
