import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Chat from './Chat';
import dayjs from 'dayjs';
import Pusher from './node_modules/pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [msg,setmsg]=useState("")
  const [Allmsg,setAllmsg]=useState([])
  const[Name,setName]=useState('')
  useEffect(()=>{
    AsyncStorage.getItem("Name").then(data=>{
      setName(data)
    })
    const fetchData =async()=>{

     const req=await axios.post("https://backend-suyg.onrender.com/sync/message/")
    //  console.log(req.data);
     setAllmsg([...req.data]);

    }
    fetchData()
    const pusher=new Pusher("833b23158b312bb49000",{ cluster: 'ap2'})
    const channel=pusher.subscribe('new_message')
    channel.bind("message",async(data)=>{
      const req=await axios.post("https://backend-suyg.onrender.com/sync/message/")
      //  console.log(req.data);
       setAllmsg([...req.data]);
    })

  },[])

  const saveChat=async(msg)=>{
    await axios.post("http://192.168.1.8:8001/post/message",{
      msg:msg,
      name:Name,
      timestamp: dayjs().format().toString()
    })
  }


  return (
    <View style={styles.container}>
    {Name?.length>0?
   <>

         <FlatList
        data={Allmsg}
        renderItem={({ item, index }) => (
         <Chat item={item} isMyMsg={Name===item.name?true:false}/>
        )}
        style={{flex:1}}
        inverted
        showsVerticalScrollIndicator={false}
      />
    <View style={{margin:10,flexDirection:"row",alignItems:"flex-end",marginBottom:15}}>
      <TextInput style={{padding:10,backgroundColor:"#f7f7f7",flex:1,borderRadius:30,paddingLeft:5}}

        placeholder="send a message"
        value={msg}
        onChangeText={(txt)=>
        setmsg(txt)
        }
      />
      <TouchableOpacity
        disabled={msg===""?true:false}
          onPress={() => {
            
            saveChat(msg);
            setmsg("");
          }}
        >
          <View style={styles.btnContainer}>
            <FontAwesome name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
    </View>
   </>:
   <View style={{marginLeft:10,justifyContent: 'center',flex:1}}>
    <Text>Enter Your Name</Text>
    <TextInput
      placeholder='Enter your name'
      onSubmitEditing={(e)=>{
        
        AsyncStorage.setItem("Name",e.nativeEvent.text)
        setName(e.nativeEvent.text)
      }}
     
      style={{backgroundColor:"#f7f7f7",
      width:"90%",
      height:50
      }}
    />
   </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnContainer: {
    backgroundColor: "rgba(123, 203, 120, 1)",
    borderRadius: 50,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
