const defaultState = {
    movieData: { status: 'loading' },
    page: 1,
    endReached: false,
}

export default function (state = defaultState, action) {
    const { type } = action
    let endReached = false
    let movieData = {}
    switch (type) {
        case 'UPDATE_MOVIEDATA':
            return {
                ...state,
                page: 1,
                endReached,
                movieData: action.movieData
            }
        case 'APPEND_MOVIEDATA':
            if (action.movieData.results.length === 0) {
                endReached = true
            }
            let results = [...state.movieData.results, ...action.movieData.results]
            movieData = { ...action.movieData, results, }
            return {
                ...state,
                page: state.page + 1,
                endReached,
                movieData,
            }
        case 'LOADING_MOVIEDATA':
            movieData = { ...state.movieData, status: 'loading' }
            return {
                ...state,
                movieData,
            }
        default:
            return state
    }
}
