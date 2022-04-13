
// import React from 'react';
// import {View,Text} from 'react-native';

// const TimeResults=()=>{
//     return(
//         <View>
//             <Text>timeresults</Text>
//         </View>
//     )
// }

// export default TimeResults;

import React from 'react';
import {View, Text} from 'react-native';

const TimeResults = () => {
  const array = [
    {
      key: '1',
      title: 'example title 1',
      subtitle: 'example subtitle 1',
    },
    {
      key: '2',
      title: 'example title 2',
      subtitle: 'example subtitle 2',
    },
    {
      key: '3',
      title: 'example title 3',
      subtitle: 'example subtitle 3',
    },
  ];

  const list = () => {
    return array.map((element) => {
      return (
        <View key={element.key} style={{margin: 10}}>
          <Text>{element.title}</Text>
          <Text>{element.subtitle}</Text>
        </View>
      );
    });
  };

  return <View>{list()}</View>;
};

export default TimeResults;

// import React, { useState } from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   ActivityIndicator,
//   Image
// } from 'react-native';

//  const TimeResults=()=> {
//    const [sunRise, setSunrine]=useState('5:57:08 AM');
//    const [sunSet, setSunset]=useState('5:57:08 PM');
//      return (
//        <View style={styles.container}>
//          <View style={styles.sunRiseBlk}>
//            <Text style={styles.discription}>Sun Rise is at:</Text>
//            <Text style={styles.time}>{sunRise}</Text>
//          </View>
//          <View style={styles.sunSetBlk}>
//           <Text style={styles.discription}>Sun Set is at:</Text>
//           <Text style={styles.time}>{sunSet}</Text>
//         </View>
//       </View>
//      );
//    }

// const styles=StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white'
//      },
//      sunRiseBlk: {
//       flex: 1,
//        backgroundColor: 'red',
//       marginTop: 64,
//       borderBottomWidth: 1,
//        borderColor: 'blue'
//      },
//      sunSetBlk: {
//       flex: 1,
//        backgroundColor: 'black',
//       borderTopWidth: 1,
//       borderColor: 'blue'
//      },
//      discription: {
//       marginTop: 100,
//       fontSize: 52,
//        textAlign: 'center',
//       color: 'blue',
//        fontFamily: 'Cochin',
//        fontWeight: 'bold'
//      },
//      time: {
//        color: 'yellow',
//        textAlign: 'center',
//       fontFamily: 'Times',
//        fontSize: 32
//     }
//  })

//  export default TimeResults;