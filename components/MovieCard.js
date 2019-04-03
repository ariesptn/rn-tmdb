import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

export default class MovieCard extends Component {
    style = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            margin: 5,
            padding: 5,
            backgroundColor: 'white',
        },
        movieImage: {
            flex: 15
        },
        movieTitle: {
            flex: 75
        }
    })

    viewDetails = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MovieDetails', params: { movie: this.props.movie }, })],
        });
        this.props.navigation.dispatch(resetAction);
        //this.props.navigation.push('MovieDetails', { movie: this.props.movie })
    }

    render() {
        const { movie } = this.props

        return (
            <TouchableOpacity onPress={(this.viewDetails)}>
                <View style={this.style.container}>
                    <View style={this.style.movieImage}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
                    </View>
                    <View style={this.style.movieTitle}>
                        <Text>{movie.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
