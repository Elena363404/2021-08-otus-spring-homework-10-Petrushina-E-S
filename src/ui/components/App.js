import React from 'react'
import Book from './Book.js';
import Author from './Author.js';
import Genre from './Genre.js';
import Comment from './Comment.js';

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {authors: [], books: [], genres: [], comments: [], newBook: {}};
    }

    // refresh
    refreshBooks() {
        fetch('/api/book')
            .then(response => response.json())
            .then(books => this.setState({books}));
    }

    refreshAuthors() {
        fetch('/api/author')
            .then(response => response.json())
            .then(authors => this.setState({authors}));
    }

    refreshGenres() {
        fetch('/api/genre')
            .then(response => response.json())
            .then(genres => this.setState({genres}));
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
                        <Book books={this.state.books} authors={this.state.authors} genres={this.state.genres} refreshCommentInApp={this.refreshComments.bind(this)}
                             refreshBookInApp={this.refreshBooks.bind(this)}/>

                        <Comment comments={this.state.comments} books={this.state.books} refreshCommentInApp={this.refreshComments.bind(this)}/>
                    </div>

                    <div class="blok-2">

                        <Author authors={this.state.authors} refreshAuthorInApp={this.refreshAuthors.bind(this)} refreshBookInApp={this.refreshBooks.bind(this)}
                        />

                        <Genre genres={this.state.genres} refreshGenreInApp={this.refreshGenres.bind(this)} refreshBookInApp={this.refreshBooks.bind(this)}/>

                    </div>
                </div>

            </React.Fragment>
        )
    }
};
