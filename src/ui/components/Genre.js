import React from 'react'

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class Genre extends React.Component {

    constructor(props) {
        super();
        this.state = {genres: []};
    }

    componentDidMount() {
        this.props.refreshGenreInApp();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({genres: nextProps.genres});
    }

    refreshGenres() {
        fetch('/api/genre')
            .then(response => response.json())
            .then(genres => this.setState({genres}));
    }

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
             .then(() => this.props.refreshGenreInApp());
    }

    handleDeleteGenreRow(id) {
        fetch(`/api/genre/${id}`, {method: 'DELETE'})
            .then(() => this.props.refreshGenreInApp())
            .then(() => this.props.refreshBookInApp());
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}