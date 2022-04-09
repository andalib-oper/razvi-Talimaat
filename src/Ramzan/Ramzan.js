import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const Ramzan = () => {
  return (
    <View style={styles.container}>
      <Text>Ramzan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Ramzan;

// import React, { Component } from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   ActivityIndicator,
//   Image
// } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import TimeResult from '../Ramzan/Ramzan';

// function urlForQuery(lat, lng) {
//   console.log(lat, lng);
//   return 'http://api.sunrise-sunset.org/json?lat='+ lat +'&lng='+ lng +'&formatted=1';
// }

// class SearchPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       message: ''
//     };
//   }

//   _executeQuery(query) {
//     this.setState({ isLoading: true });
//     fetch(query)
//       .then(response => response.json())
//       .then(json => this._handleResponse(json.results))
//       .catch(error =>
//         this.setState({
//           isLoading: false,
//           message: 'Something bad happened ' + error
//         }));
//   }

//   _handleResponse(response) {
//     console.log(response.sunrise);
//     this.setState({ isLoading: false, message: '' });
//     if(response) {
//       this.props.navigator.push({
//         title: 'Results',
//         component: TimeResult,
//         passProps: {time: response}
//       })
//     }

//   }
//   // Geolocation.getCurrentPosition(info => console.log(info));
//   onGeoLocationRequest() {
//     Geolocation.getCurrentPosition(
//       location => {
//         let lat = location.coords.latitude;
//         let lng = location.coords.longitude;
//         let query = urlForQuery(lat, lng);
//         this._executeQuery(query);
//       },
//       error => {
//         this.setState({
//           message: 'There was a problem with obtaining your location:' + error
//         });
//       });
//   }

//   render() {
//     let spinner = this.state.isLoading ?
//       ( <ActivityIndicator
//           size='large' /> ) :
//       ( <View/>);
//     return (
//       <View style={styles.container}>
//         <Image source={require('../../images/background3.jpeg')} style={styles.image} />
//         <Text style={styles.discription}>
//           Find out what time is the next Sunset or Sunrise in your city.
//         </Text>
//         {spinner}
//         <Text style={styles.discription}>{this.state.message}</Text>
//         <View style={styles.buttons}>
//           <TouchableHighlight
//             style={styles.button}
//             // underlayColor='#00ffff'
//             onPress={this.onGeoLocationRequest.bind(this)}>
//             <Text ref='SunSet' style={styles.buttonText}>Find Times</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     );
//   }
// }

// const styles= StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       backgroundColor: 'white'
//     },
//     discription: {
//       marginTop: 15,
//       fontSize: 18,
//       textAlign: 'center',
//       color: 'blue',
//       fontFamily: 'Cochin'
//     },
//     button: {
//       margin: 10,
//       height: 156,
//       width: 150,
//       flex: 1,
//       flexDirection: 'row',
//       backgroundColor: 'blue',
//       borderWidth: 1,
//       borderRadius: 5,
//       alignSelf: 'stretch',
//       justifyContent: 'center'
//     },
//     buttons: {
//       flexDirection: 'column',
//       alignItems: 'center',
//       alignSelf: 'stretch',
//       marginTop: 50
//     },
//     buttonText: {
//       fontSize: 18,
//       color: 'yellow',
//       alignSelf: 'center',
//       fontFamily: 'Times'
//     },
//     image: {
//       width: 400,
//       height: 300,
//       marginTop: 64
//     }
//   });

// export default SearchPage;