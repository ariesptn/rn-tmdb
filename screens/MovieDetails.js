import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, Button } from 'react-native'

export default class MovieDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.article.title
        }
    }

    viewWebView = () => {
        
    }

    render() {
        const { article } = this.props.navigation.state.params

        return (
            <View style={this.style.container}>
                <ScrollView>
                    <View style={this.style.card}>
                        <Text style={this.style.title}>{article.title}</Text>
                    </View>
                    <View style={this.style.card}>
                        <Text style={this.style.info}>Source : {article.source.name} ({article.source.id})</Text>
                        <Text style={this.style.info}>Author : {article.author}</Text>
                        <Text style={this.style.info}>{article.publishedAt}</Text>
                    </View>
                    <View style={this.style.card}>
                        <View style={this.style.image}>
                            <Image source={{ uri: article.urlToImage || 'https://dummyimage.com/500' }} style={{ width: 350, height: 350 }} />
                        </View>
                    </View>
                    <View style={this.style.card}>
                        <Text style={this.style.description}>{article.description}</Text>
                    </View>
                    <View style={this.style.card}>
                        <Text style={this.style.content}>{article.content}</Text>
                    </View>
                </ScrollView>
                <View>
                    <View style={this.style.url}>
                        <Button title="Visit Site" onPress={this.viewWebView} />
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
        content: {

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
