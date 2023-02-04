import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';

export default function Chat({item,isMyMsg}) {
    console.log(item);
return (
 <View style={styles.container}>
 <View style={{  backgroundColor:!isMyMsg? "rgba(240, 240, 240, 1)"
                  : "#rgba(229, 245, 228, 1)",
                // height:50,
                marginLeft: isMyMsg ? "auto" : 0,
                marginRight: !isMyMsg ? "auto" : 0,
                borderRadius: 15,

                padding: 10,
                minWidth: 140,
                }}>

  <Text style={{paddingBottom:5, fontWeight: "bold",
    // marginBottom: 5,
    // fontFamily: "comfortaa",
    color: "rgba(109, 139, 244, 1)",}}>{item.name}</Text>
 <Text>{item.msg}</Text>
 </View>
 </View>
  );
}
const styles= StyleSheet.create({
container: {
   flex:1,
   padding: 10,
}
});