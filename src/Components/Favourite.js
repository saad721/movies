/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
// import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currtext: '',
            limit: 5,
            currpage: 1
        }
    }

    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics"
        };

        let data = JSON.parse(localStorage.getItem('movies') || '[]');

        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres')

        this.setState({
            genres: [...temp],
            movies: [...data]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currgen: genre,
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies;

        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity
        })

        this.setState({
            movies: [...temp]
        })

    }

    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.popularity - objB.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average
        })
        this.setState({
            movies: [...temp]
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currpage: page,
        })
    }


    handleDelete = (id) => {
        let narr = [];
        narr = this.state.movies.filter(movieObj => movieObj.id != id)

        this.setState({
            movies: [...narr]
        })

        localStorage.setItem('movies', JSON.stringify(narr))
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics"
        };

        let filterarr = [];

        if (this.state.currtext === '') {
            filterarr = this.state.movies;
        } else {
            filterarr = this.state.movies.filter((movieObj) => {
                let title = (movieObj.original_title || movieObj.original_name).toLowerCase();
                return title.includes(this.state.currtext.toLowerCase())
            })
        }

        if (this.state.currgen !== "All Genres") {
            filterarr = this.state.movies.filter(movieObj => genreids[movieObj.genre_ids[0]] == this.state.currgen)
            if (this.state.currtext !== '') {
                filterarr = filterarr.filter((movieObj) => {
                    let title = (movieObj.original_title || movieObj.original_name).toLowerCase();
                    return title.includes(this.state.currtext.toLowerCase())
                })
            }
        }

        let pages = Math.ceil(filterarr.length / this.state.limit);

        let pagesArr = [];

        for (let i = 1; i <= pages; i++) {
            pagesArr.push(i)
        }

        let si = (this.state.currpage - 1) * this.state.limit;
        let ei = si + this.state.limit;

        filterarr = filterarr.slice(si, ei);

        return (

            <div className='main'  >
                <div className='row'>
                    <div className='col-lg-3 col-sm-12' >
                        <ul className='list-group favourites-genres'>
                            {
                                this.state.genres.map(genre => (
                                    this.state.currgen == genre ?
                                        <li className="list-group-item" style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }}>{genre}</li> :
                                        <li className="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                ))
                            }

                            {/* <li className="list-group-item" style={{ background: 'white', color: '#3f51b5' }}>genre</li> */}
                            {/* <li className="list-group-item" style={{ background: 'white', color: '#3f51b5' }}>genre</li> */}
                        </ul>
                    </div>
                    <div className='col-lg-9 favourites-table col-sm-12'>
                        <div className="row">
                            <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currtext} onChange={(e) => this.setState({ currtext: e.target.value })} />
                            <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
                        </div>
                        <div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc} />Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterarr.map(movieObj => (
                                            <tr>
                                                <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} />{movieObj.original_title || movieObj.original_name}</th>
                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button type='button' className='btn btn-danger' onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {
                                    pagesArr.map(page => (
                                        <li class="page-item"><a className="page-link" onClick={() => this.handlePageChange(page)} >{page}</a></li>
                                    ))
                                }

                            </ul>
                        </nav>
                    </div>
                </div>

            </div>

        )
    }
}




// {10759:"Action & Adventure" , 16:"Animation",35:"Comedy",80:"Crime",99:"Documentary", 18:"Drama",10751:"Family",10762:"Kids",9648:"Mystery",10763:"News",10764:"Reality","id":10765,"name":"Sci-Fi & Fantasy",10766:"Soap",10767:"Talk",10768:"War & Politics",37 :"Western"}