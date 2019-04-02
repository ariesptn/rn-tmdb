import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'

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
        this.props.navigation.push('MovieDetails', { article: this.props.article })
    }

    render() {
        const { article } = this.props

        return (
            <TouchableOpacity onPress={(this.viewDetails)}>
                <View style={this.style.container}>
                    <View style={this.style.movieImage}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: article.urlToImage || 'https://dummyimage.com/500' }} />
                    </View>
                    <View style={this.style.movieTitle}>
                        <Text>{article.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
