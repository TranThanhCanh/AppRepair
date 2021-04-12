import  React from 'react';
import {
  StyleSheet, Dimensions,
  ScrollView,
  View, Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,

} from 'react-native';

import mapboxgl from "@react-native-mapbox-gl/maps";

mapboxgl.accessToken('pk.eyJ1IjoidGhhbmhkYXQyMTA2IiwiYSI6ImNraW9jd3k1MzAyMnMycW8xOHd1Mzd2NWwifQ.R9VC1rAOZg6NxyoyX_oJYA');
const { width } = Dimensions.get('screen');
//var dataSource=[] 


class Home extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
		lng: 5,
		lat: 34,
		zoom: 2
		};

  }
  componentDidMount() {
	const map = new mapboxgl.Map({
	container: this.mapContainer,
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [this.state.lng, this.state.lat],
	zoom: this.state.zoom
	});
	}
	render() {
		return (
		<div>
		<div ref={el => this.mapContainer = el} />
		</div>
		)
		}
}

const styles = StyleSheet.create({
  container: {
		flex: 1
	},
	map: {
		height: 400,
		marginTop: 80
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'blue',
		transform: [{ scale: 0.6 }]
	}
});

export default Home;
