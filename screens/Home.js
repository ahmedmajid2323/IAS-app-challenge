import { StyleSheet, Text, View , Image, Pressable} from 'react-native'
import MapView , { Marker } from 'react-native-maps';

const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
            "visibility": "on"  // Ensure icons are visible
            }
        ]
        },
        {
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#BDBDBD"  // Lighter text for visibility
            }
        ]
        },
        {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
            "color": "#212121"
            }
        ]
        },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4A5E65"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  

const Home = ({navigation}) => {

    const Indus_Mourouj = {
        latitude: 36.736149160443354,
        longitude: 10.207564884428598,
    };

    const Indus_Beja = { 
        latitude: 36.73342271403536,
        longitude:  9.18434044646725,
    };

    const Indus_Gafsa = { 
        latitude: 34.43198252427228,
        longitude:   8.776406155107196 ,
    };

    const Indus_Sfax = {  
        latitude:  34.73807839636312,
        longitude:   10.759868987252638 ,
    };

    const Indus_Gabes = {   
        latitude: 33.88820858703787,
        longitude:  10.097937316255079 ,
    };

  return (
    <View style={{flex:1}}>
      <MapView
        customMapStyle={darkMapStyle}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 34.3869, 
          longitude: 9.5375, 
          latitudeDelta: 4, 
          longitudeDelta: 4, 
        }}>

        <Marker
        coordinate={Indus_Mourouj}
        anchor={{ x: 0.5, y: 0.5 }} >
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image
            source={require('../assets/usine.png')} 
            style={{ width: 50, height: 50 }} />
            <View style={styles.label}>
                <Text style={{color:'black',fontWeight:700,fontSize:10}}>Ind Zone Mourouj</Text>
            </View>
          </View>
        </Marker>

        <Marker
        coordinate={Indus_Beja}
        anchor={{ x: 0.5, y: 0.5 }} >
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image
            source={require('../assets/usine.png')} 
            style={{ width: 50, height: 50 }} />
            <View style={styles.label}>
                <Text style={{color:'black',fontWeight:700,fontSize:10}}>Ind Zone Beja</Text>
            </View>
          </View>
        </Marker>

        <Marker
        coordinate={Indus_Sfax}
        anchor={{ x: 0.5, y: 0.5 }} >
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image
            source={require('../assets/usine.png')} 
            style={{ width: 50, height: 50 }} />
            <View style={styles.label}>
                <Text style={{color:'black',fontWeight:700,fontSize:10}}>Ind Zone Sfax</Text>
            </View>
          </View>
        </Marker>

        <Marker onPress={()=>navigation.navigate('zone_industielle')}
        coordinate={Indus_Gabes}
        anchor={{ x: 0.5, y: 0.5 }} >
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image
            source={require('../assets/usine.png')} 
            style={{ width: 50, height: 50 }} />
            <View style={styles.label}>
                <Text style={{color:'black',fontWeight:700,fontSize:10}}>Ind Zone Gabes</Text>
            </View>
          </View>
        </Marker>

        <Marker 
        coordinate={Indus_Gafsa}
        anchor={{ x: 0.5, y: 0.5 }} >
          <View 
           style={{flexDirection:'column',alignItems:'center'}}>
            <Image
            source={require('../assets/usine.png')} 
            style={{ width: 50, height: 50 }} />
            <View style={styles.label}>
                <Text style={{color:'black',fontWeight:700,fontSize:10}}>Ind Zone Gafsa</Text>
            </View>
          </View>
        </Marker>

      </MapView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    label:{
        padding:5,
        backgroundColor:'#06FF60',
        textAlign:'center',
        borderRadius:20
    }
})