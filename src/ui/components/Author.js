import React from 'react'

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class Author extends React.Component {

    constructor(props) {
        super();
        this.state = {authors: []};
    }

    componentDidMount() {
        this.props.refreshAuthorInApp();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({authors: nextProps.authors});
    }

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
             .then(() => this.props.refreshAuthorInApp());
    }

    handleDeleteAuthorRow(id) {
        fetch(`/api/author/${id}`, {method: 'DELETE'})
            .then(() => this.props.refreshBookInApp())
            .then(() => this.props.refreshAuthorInApp())
    }

    refreshAuthors() {
        fetch('/api/author')
            .then(response => response.json())
            .then(authors => this.setState({authors}));
    }

    render() {
        return (
            <React.Fragment>
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

            </React.Fragment>
        )
    }
}