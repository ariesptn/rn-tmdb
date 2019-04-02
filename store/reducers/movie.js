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
            if (action.movieData.articles.length === 0) {
                endReached = true
            }
            let articles = [...state.movieData.articles, ...action.movieData.articles]
            movieData = { ...action.movieData, articles, }
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
