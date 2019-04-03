import axios from 'axios'

async function getMovie(category, search, page) {
    let api_key = '54742c232ad56eb16eb9a776e0c431c2'
    category = category || ''
    search = search || ''
    page = page || '1'

    let url = ''
    if (search !== '') {
        url = `https://api.themoviedb.org/3/movie/${search}/similar?api_key=${api_key}&language=en-US&page=${page}`
    } else {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page}`
    }
    let movieData = await axios({
        url,
    })
    console.log('movie data obtained')
    return movieData.data
}

export { getMovie }
