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
                        <Book authors={this.state.authors} genres={this.state.genres} refreshComments={this.refreshComments.bind(this)}
                             refreshBookInApp={this.refreshBooks.bind(this)}/>

                        <Comment books={this.state.books}/>
                    </div>

                    <div class="blok-2">

                        <Author refreshBooks={this.refreshBooks.bind(this)} refreshAuthorInApp={this.refreshAuthors.bind(this)}/>

                        <Genre refreshBooks={this.refreshBooks.bind(this)} refreshGenreInApp={this.refreshGenres.bind(this)}/>

                    </div>
                </div>

            </React.Fragment>
        )
    }
};
