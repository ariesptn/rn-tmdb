import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, Button, FlatList } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { updateMovieData, appendMovieData } from '../store/actions/movie.js'
import MovieCard from '../components/MovieCard.js'

class MovieDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.movie.title
        }
    }

    componentDidMount() {
        this.getMovie()
    }

    getMovie = async () => {
        let category = '', search = ''
        const params = this.props.navigation.state.params
        if (params) {
            search = params.movie.id || ''
        }
        await this.props.updateMovieData(category, search)
    }

    appendMovie = async () => {
        let category = '', search = ''
        const params = this.props.navigation.state.params
        if (params) {
            search = params.movie.id || ''
        }
        if (!this.props.endReached) {
            await this.props.appendMovieData(category, search, this.props.page + 1)
        }
    }

    viewMovieScreen = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Movie', })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { movie } = this.props.navigation.state.params
        const { movieData, navigation } = this.props

        return (
            <View style={this.style.container}>
                <ScrollView>
                    <View style={this.style.card}>
                        <Text style={this.style.title}>{movie.title}</Text>
                    </View>
                    <View style={this.style.card}>
                        <Text style={this.style.info}>Release date : {movie.release_date}</Text>
                        <Text style={this.style.info}>Average rating : {movie.vote_average}/10 by {movie.vote_count} people</Text>
                        <Text style={this.style.info}>Popularity : {movie.popularity}</Text>
                    </View>
                    <View style={this.style.card}>
                        <View style={this.style.image}>
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ width: 350, height: 350 }} />
                        </View>
                    </View>
                    <View style={this.style.card}>
                        <Text style={this.style.description}>{movie.overview}</Text>
                    </View>
                    <View style={this.style.card}>
                        <Text style={this.style.description}>Related movies :</Text>
                        {movieData.results ?
                            (<FlatList data={movieData.results} keyExtractor={(item, index) => index.toString()}
                                onEndReached={() => { }} onEndReachedThreshold={0.01}
                                renderItem={
                                    ({ item }) => <MovieCard navigation={this.props.navigation} movie={item}></MovieCard>}
                            />) : null}
                        {movieData.status === 'loading' ? (<Text style={this.style.status}>Loading...</Text>) : null}
                    </View>
                </ScrollView>
                <View>
                    <View style={this.style.url}>
                        <View style={this.style.button}><Button title="Go To Now Playing" onPress={this.viewMovieScreen} /></View>
                    </View>
                </View>
            </View>
        )
    }

    style = {
        container: {
            flex: 1,
            backgroundColor: '#d9e9f9'
        },
        card: {
            padding: 5,
            margin: 5,
            backgroundColor: 'white'
        },
        image: {
            alignSelf: 'center',
        },
        title: {
            textAlign: 'center',
            fontSize: 24,
        },
        info: {

        },
        description: {
            fontSize: 18,
        },
        status: {
            margin: 5,
            padding: 10,
            fontSize: 18,
            textAlign: 'center',
            backgroundColor: 'white'
        },
        url: {
            margin: 5,
            padding: 10,
            fontSize: 18,
            textAlign: 'center',
            backgroundColor: 'white'
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
