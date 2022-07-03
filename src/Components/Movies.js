/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
// https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656
import React, { Component } from 'react'
// import { movies } from './getMovies';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';


export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }

    async componentDidMount() {

        // https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656
        // https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        this.setState(
            {
                movies: [...data.results]
            }
        )

    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        this.setState(
            {
                movies: [...data.results]
            }
        )
    }

    handleRight = () => {
        let temparr = []
        for (let i = 1; i <= this.state.currPage + 1; i++) {
            temparr.push(i);
        }
        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage + 1,
        }, this.changeMovies)
    }

    handleLeft = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }

    handleClick = (value) => {
        if (this.state.currPage != value) {
            this.setState({
                currPage: value,
            }, this.changeMovies)
        }
    }

    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) => m.id != movie.id)
        } else {
            oldData.push(movie);
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        this.handleFavouritesState();
        console.log(oldData);
    }

    handleFavouritesState = () => {
        const oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        let temp = oldData.map((movie) => movie.id);
        this.setState({
            favourites: [...temp]
        })
    }

    render() {

        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className="text-center"><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map(movieObj => (
                                        <div className='card movies-card' onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => { this.setState({ hover: '' }) }}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title">{movieObj.original_title || movieObj.original_name}</h5>
                                            {/* <p class="card-text movies-text">{movieObj.overview}</p> */}
                                            <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>

                                                {this.state.hover == movieObj.id &&
                                                    <a className="btn btn-primary movies-button" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from favourites" : "Add to favourites"}</a>}

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map(value => (
                                                <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
