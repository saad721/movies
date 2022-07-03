/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { movies } from "./getMovies";
import React, { Component } from 'react'
import axios from "axios";

export default class Banner extends Component {
    constructor() {
        super();
        this.state = {
            movie: ''
        }
    }


    async componentDidMount() {

        // https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656
        // https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a81e6301979c5275e71700304289f656&language=en-US&page=1`)
        let data = res.data;
        this.setState(
            {
                movie: data.results[0]
            }
        )
        console.log('banner mounting done');

    }


    render() {
        // let movie = movies.results[0];
        console.log(this.state.movie)
        return (
            <>
                {this.state.movie == '' ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div className="card banner-card">
                        <img src={`https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`} alt={this.state.movie.title || this.state.movie.name} className="card-img-top banner-img" />
                        <div className="card-body">
                            <h1 className="card-title banner-title">{this.state.movie.original_title || this.state.movie.original_name}</h1>
                            <p className="card-text banner-text">{this.state.movie.overview}</p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>}
            </>
        )
    }
}
