import axios from 'axios'

async function getMovie(category, search, page) {
    category = category || ''
    search = search || ''
    page = page || '1'

    let url = ''
    if (search !== '') {
        url = `https://newsapi.org/v2/everything?q=${search}&language=en&page=${page}&pageSize=10`
    } else {
        url = `https://newsapi.org/v2/top-headlines?q=&category=${category}&country=us&page=${page}&pageSize=10`
    }
    let movieData = await axios({
        url,
        headers: {
            'Authorization': 'Bearer 2ee86e45c1cb43b5b559d8042d629fca'
        }
    })
    console.log('movie data obtained')
    return movieData.data
}

export { getMovie }
