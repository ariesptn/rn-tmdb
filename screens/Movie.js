import React, { Component } from 'react'
import { Text, View, ScrollView, Button, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { updateMovieData, appendMovieData } from '../store/actions/movie.js'
import MovieCard from '../components/MovieCard.js'

class Movie extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params
        let title = 'Movie'
        if (params) {
            if (params.title) {
                title = navigation.state.params.title
            }
        }
        return {
            title: title,
        }
    }

    componentDidMount() {
        this.getMovie()
    }

    componentWillMount() {
        this.updateTitle()
    }

    getMovie = async () => {
        let category = '', search = ''
        const params = this.props.navigation.state.params
        if (params) {
            search = params.search || ''
        }
        await this.props.updateMovieData(category, search)
    }

    appendMovie = async () => {
        let category = '', search = ''
        const params = this.props.navigation.state.params
        if (params) {
            category = params.category || ''
            search = params.search || ''
        }
        if (!this.props.endReached) {
            await this.props.appendMovieData(category, search, this.props.page + 1)
        }
    }

    updateTitle = () => {
        let movieFilterInfo = ''
        const params = this.props.navigation.state.params
        if (params) {
            if (params.search) {
                movieFilterInfo = "Search : " + params.search
            } else if (params.category) {
                movieFilterInfo = "Category : " + params.category
            } else {
                movieFilterInfo = "Now Playing"
            }
        } else {
            movieFilterInfo = "Now Playing"
        }
        this.props.navigation.setParams({ title: movieFilterInfo })
    }

    render() {
        const { movieData, navigation } = this.props

        return (
            <View style={this.style.movieList}>
                {movieData.results ?
                    (<FlatList data={movieData.results} keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.appendMovie} onEndReachedThreshold={0.01}
                        renderItem={
                            ({ item }) => <MovieCard navigation={this.props.navigation} movie={item}></MovieCard>}
                    />) : null}
                {movieData.status === 'loading' ? (<Text style={this.style.status}>Loading...</Text>) : null}
                <View style={this.style.options}>
                    <View style={this.style.button}><Button title="Reload" onPress={this.getMovie} /></View>
                </View>
            </View>
        )
    }

    style = StyleSheet.create({
        movieList: {
            flex: 1,
            backgroundColor: '#d9e9f9'
        },
        status: {
            margin: 5,
            padding: 10,
            fontSize: 18,
            textAlign: 'center',
            backgroundColor: 'white'
        },
        options: {
            flexDirection: 'row',
            margin: 5,
            padding: 10,
            fontSize: 18,
            backgroundColor: 'white'
        },
        button: {
            flex: 1
        }
    })
}

const mapStateToProps = (state) => ({
    movieData: state.movie.movieData,
    page: state.movie.page,
    endReached: state.movie.endReached,
})
const mapDispatchToProps = (dispatch) => ({
    updateMovieData: (category, search) => dispatch(updateMovieData(category, search)),
    appendMovieData: (category, search, page) => dispatch(appendMovieData(category, search, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
