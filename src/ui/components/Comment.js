import React from 'react'

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class Comment extends React.Component {

    constructor(props) {
        super();
        this.state = {comments: []};
    }

    componentDidMount() {
        this.refreshComments();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({comments: nextProps.comments});
    }

    refreshComments() {
        fetch('/api/comment')
            .then(response => response.json())
            .then(comments => this.setState({comments}));
    }

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
             .then(() => this.props.refreshCommentInApp());
    }

    handleDeleteCommentRow(id) {
        fetch(`/api/comment/${id}`, {method: 'DELETE'})
            .then(() => this.props.refreshCommentInApp());
    }

    render() {
        return (
            <React.Fragment>
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
                                    {this.props.books.map((book) => (
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
            </React.Fragment>
        )
    }
}