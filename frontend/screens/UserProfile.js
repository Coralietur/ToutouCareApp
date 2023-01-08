import React from 'react';
import { useEffect, useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
  KeyboardAvoidingView,
  Pressable
} from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { modify } from "../reducers/user";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';


const BACKEND_ADDRESS = 'http://192.168.1.32';

export default function UserProfile() {

  const dispatch = useDispatch();
  const [editView, setEditView] = useState(false)
  const [userInfosBackup, setUserInfosBackup] = useState();
  const [editColor, setEditColor] = useState('white')
  

  const user = useSelector((state) => state.user.value);
  const [userInfos, setUserInfos] = useState([]);
  
    useEffect(() => {
      if (!user.data.email) {
        return;
      }
      fetch(`${BACKEND_ADDRESS}:3000/users/all/${user.data.email}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {setUserInfos(data.user)};
        });
    }, []);

  let modifyBouton = (
    <View style={styles.boutonContainer}>
      <TouchableOpacity 
        onPress={() => {handleModifyBouton(), setEditColor("darkgray")}} 
        style={styles.button} 
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Modifier</Text>
      </TouchableOpacity>  
    </View>
  )

  if (editView) {
    modifyBouton = (
      <View style={styles.superBoutonContainer}>
        <View style={styles.boutonContainer}>
          <TouchableOpacity onPress={() => handleCancel()} style={styles.buttonPressed} activeOpacity={0.8}>
            <Text style={styles.textButton}>Annuler</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boutonContainer}>
          <TouchableOpacity onPress={() => handleAccept()} style={styles.buttonPressed} activeOpacity={0.8}>
            <Text style={styles.textButton}>Accepter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleModificationProfil = () => {
    fetch(`${BACKEND_ADDRESS}:3000/users/modify/${user.data.email}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: userInfos.nom,
        prenom: userInfos.prenom,
        chien: userInfos.chien,
        date_de_naissance: userInfos.date_de_naissance,
        telephone: userInfos.telephone,
        rue: userInfos.rue,
        code_postal: userInfos.code_postal,
        ville: userInfos.ville,
        profession: userInfos.profession,
        nom_contact_urgence: userInfos.nom_contact_urgence,
        tel_contact_urgence: userInfos.tel_contact_urgence,
      }),
    }).then((response) => response.json())
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  }

  const handleModifyBouton = () => {
    setEditView(true);
    setUserInfosBackup(userInfos);
    console.log(userInfos)
  };

  const handleAccept = () => {
    setEditView(false);
    setEditColor('white')
    dispatch(modify({data: userInfos}))
    handleModificationProfil()
  };

  const handleCancel = () => {
    setEditView(false);
    setUserInfos(userInfosBackup);
    setEditColor("white");
  }

  return (
    <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.main}>
        <ScrollView>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Nom:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, nom: text})}
                  editable={editView}
                  value={userInfos.nom}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Prénom:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, prenom: text})}
                  editable={editView} 
                  value={userInfos.prenom}
                  textContentType='name'
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Chien:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  editable={editView} 
                  onChangeText={(text) => setUserInfos({...userInfos, chien: text})}
                  value={userInfos.chien}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
              >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Tel:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  onChangeText={(text) => setUserInfos({...userInfos, telephone: text})}
                  editable={editView} 
                  value={userInfos.telephone}
                  maxLength={15}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Email:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  editable={editView} 
                  onChangeText={(text) => setUserInfos({...userInfos, email: text})}
                  value={userInfos.email}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Profession:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  onChangeText={(text) => setUserInfos({...userInfos, profession: text})}
                  editable={editView} 
                  value={userInfos.profession}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Rue:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, rue: text})}
                  editable={editView} 
                  value={userInfos.rue}
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Code postal:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, code_postal: text})}
                  editable={editView} 
                  value={userInfos.code_postal}
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Ville:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, ville: text})}
                  editable={editView} 
                  value={userInfos.ville}
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Contact d'urgence:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, nom_contact_urgence: text})}
                  editable={editView} 
                  value={userInfos.nom_contact_urgence}
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer}
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Tel contact urgence:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setUserInfos({...userInfos, tel_urgence_contact: text})}
                  editable={editView} 
                  value={userInfos.tel_contact_urgence}
                  maxLength={15}
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor} onPress={() => handleModifier()}/>
            </Pressable>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {modifyBouton}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: 'white',
    flex: 4,
    paddingBottom: 5, 
  },
  photoNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#008486'
  },
  profilNameText: {
    fontSize: 21,
    fontWeight: 'bold',
    right: '10%',
  },
  switchContainer: {
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  singleInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical :10,
    paddingLeft:15,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
  textInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    left: '50%',
    fontSize: 18,
    fontWeight: '400',
  },
  inputStyleEdit: {
    left: '50%',
    fontSize: 18,
    fontWeight: '400',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flex: 1,
  },
  boutonContainer: {
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  textButtonPressed: {
    textAlign: 'center',
    color: "#008486",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "#008486",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonPressed: {
    width: 150,
    height: 45,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "#008486",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20, 
  },
  buttonPressed2: {
    width: '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "fff",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20, 
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#008486',
  },
  superBoutonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50, 
  },
})
