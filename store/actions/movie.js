import { getMovie } from '../../api/movie.js'

export function updateMovieData(category, search) {
    category = category || ''
    search = search || ''

    let movieData = { status: 'loading' }

    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_MOVIEDATA',
            movieData,
        })
        movieData = await getMovie(category, search)
        movieData = movieData
        dispatch({
            type: 'UPDATE_MOVIEDATA',
            movieData,
        })
    }
}

export function appendMovieData(category, search, page) {
    category = category || ''
    search = search || ''

    return async (dispatch) => {
        dispatch({
            type: 'LOADING_MOVIEDATA',
        })
        movieData = await getMovie(category, search, page)
        movieData = movieData
        dispatch({
            type: 'APPEND_MOVIEDATA',
            movieData,
        })
    }
}
