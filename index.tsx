import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput} from 'react-native'
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc} from 'firebase/firestore'

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Optionally import the services that you want to use
  // import {...} from "firebase/auth";
  // import {...} from "firebase/database";
  // import {...} from "firebase/firestore";
  // import {...} from "firebase/functions";
  // import {...} from "firebase/storage";
  
  const resetFormData = ()=> {
    setSecureTextEntry(true)
    setDisplay(false);
    setName('');
    setEmail('');
    setPassword('');
  };
  
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBLJURU5ZIcqswOnRIbWOVgxNztmP6qdro",
    authDomain: "toggle-button-4087f.firebaseapp.com",
    databaseURL: "https://toggle-button-4087f-default-rtdb.firebaseio.com",
    projectId: "toggle-button-4087f",
    storageBucket: "toggle-button-4087f.appspot.com",
    messagingSenderId: "441033032973",
    appId: "1:441033032973:web:98bae899e594302dc55c44",
    measurementId: "G-CBSWK5B3Y5"
  };

  initializeApp(firebaseConfig);

  const sendData = async ()=>{
    const firestore = getFirestore();
  
    await setDoc(doc(firestore, "user", name), {
      Name: name,
      Email: email,
      Password: password
    })
  }

  return (
    <View>
      <TextInput placeholder="Enter User Name" style={styles.textInput} onChangeText={(text)=>setName(text)} value={name}/>
      <TextInput placeholder="Enter User Email" style={styles.textInput} onChangeText={(text)=>setEmail(text)} value={email}/>
      <TextInput placeholder="Enter User Password" style={styles.textInput} onChangeText={(text)=>setPassword(text)} value={password} secureTextEntry={secureTextEntry}/>
      <View style={{marginRight: 150, marginLeft: 150, position: 'relative', bottom: 48.8, left: 130}}>
        <Button title="show" onPress={()=> secureTextEntry ? setSecureTextEntry(false) : setSecureTextEntry(true)}/>
      </View>
      
      <View style={{marginBottom: 10}}><Button color='green' onPress={()=> sendData()} title="Send Details"/></View>
      <Button title="Clear Details" onPress={resetFormData}/>
      <View>
        {
          display ? 
            <View>
              <Text style={{fontSize: 20}}>User Name is: {name}</Text>
              <Text style={{fontSize: 20}}>User Email is: {email}</Text>
              <Text style={{fontSize: 20}}>User Password is: {password}</Text>
            </View>
            : null
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    fontSize: 18,
    color: 'blue',
    borderWidth: 2,
    borderColor: 'blue',
    margin: 10,
  },
});

export default App;
