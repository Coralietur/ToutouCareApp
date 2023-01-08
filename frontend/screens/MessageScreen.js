import React from 'react';
import { useState } from 'react';
import {  
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput,  
  KeyboardAvoidingView,
  Pressable
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBone } from '@fortawesome/free-solid-svg-icons/faBone';
import { faPaw } from '@fortawesome/free-solid-svg-icons/faPaw';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

export default function ProfilScreen() {
  
  const [message, setMessage] = useState([])
  const [allMessage, setAllMessage] = useState([])
  const [newSms, setNewSms] = useState(false)
  let newMessage;

  const handleSend = () => {
    setNewSms(true)
    setAllMessage(message)
    setMessage('')
  }
  if (newSms) {
    newMessage = (
      <View style={styles.messageUserContainer}>
        <View style={styles.bulleUserContainer}>
          <Text style={styles.textBouton}>{allMessage}</Text>
        </View>
        <FontAwesomeIcon size={30} icon={faPaw} color={'#A3C6C7'}/> 
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.all} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <FontAwesomeIcon size={50} icon={faUser} color={'gray'}/>
        <Text style={styles.headerText}>Joe responsable canin</Text>
      </View>
      <ScrollView style={styles.main}>
        <View style={styles.messageContainer}>
          <FontAwesomeIcon size={30} icon={faPaw} color={'#D2B87F'}/> 
          <View style={styles.bulleContainer}>
            <Text style={styles.textBouton}>Bonjour Coralie!{ '\n'}Sally s'est fait un nouvel ami, elle n'a pas arrêté de jouer avec le même toutou aujourd'hui!</Text>
          </View>
        </View>
        <View style={styles.messageUserContainer}>
          <View style={styles.bulleUserContainer}>
            <Text style={styles.textBouton}>Coucou Joe, { '\n'}adorable 😊😊😊😊 Comment il s'appelle? </Text>
          </View>
          <FontAwesomeIcon size={30} icon={faPaw} color={'#A3C6C7'}/> 
        </View>
        <View style={styles.messageContainer}>
          <FontAwesomeIcon size={30} icon={faPaw} color={'#D2B87F'}/> 
          <View style={styles.bulleContainer}>
            <Text style={styles.textBouton}>Rio un beau Border Collie 😉 { '\n'} elle sera épuisée ce soir quand tu vas la récupérer.</Text>
          </View>
        </View>
        {newMessage}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMessage}
          value={message}
          placeholder={'Insérer votre message...'}
          placeholderTextColor={'black'}
        />
        <Pressable style={styles.bouton} onPress={handleSend}>
          <FontAwesomeIcon size={40} icon={faBone} color={'#008486'} transform={{ rotate: 42 }}/>
        </Pressable>
      </View>
      <View style={styles.navigation}>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  main: {
    backgroundColor: 'white',
    flex: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10, 
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 'auto',
  },
  bulleContainer: {
    maxWidth: '60%',
    backgroundColor: '#FFDF99',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginLeft: 10,
  },
  bulleUserContainer: {
    maxWidth: '60%',
    backgroundColor: '#C1ECED',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginRight: 10,
  },
  footer: {
    width: '100%',
  
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
  },
  textInput: {
    width: '70%',
    height: 60,
    maxHeight: 100,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  bouton: {
    width: '20%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  textBouton: {
    fontSize: 18,
  },
  navigation: {
    height:12,
    width: '100%',
  }
})