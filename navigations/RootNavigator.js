import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";
import Movie from '../screens/Movie.js'
import MovieDetails from '../screens/MovieDetails.js'

const RootNav = createStackNavigator({
    Movie: {
        screen: Movie
    },
    MovieDetails: {
        screen: MovieDetails
    },
}, {
        initialRouteName: 'Movie',
        defaultNavigationOptions: {
            title: 'Movie App'
        }
    })

export default createAppContainer(RootNav)
