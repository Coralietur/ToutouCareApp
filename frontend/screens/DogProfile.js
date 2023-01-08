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
import { collectData, modify } from "../reducers/dog";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import BouncyCheckbox from "react-native-bouncy-checkbox";



const BACKEND_ADDRESS = 'http://192.168.1.32';

export default function DogProfile() {

  const dispatch = useDispatch();
  const [editView, setEditView] = useState(false)
  const [dogInfosBackup, setDogInfosBackup] = useState();
  const [editColor, setEditColor] = useState('white');
  
  const user = useSelector((state) => state.user.value);
  
  const [dogInfos, setDogInfos] = useState([]);

useEffect(() => { 
  fetch(`${BACKEND_ADDRESS}:3000/users/dogs/${user.data._id}`)
  .then(response => response.json())
  .then(data => {
      if (data) {dispatch(collectData(data));
        setDogInfos(data.dog)
      }
    });
  }, []);
  const dog = useSelector((state) => state.dog.value);
  console.log("ICI",dogInfos);
  

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
    fetch(`${BACKEND_ADDRESS}:3000/users/alldogs/modify/${dog._id}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: dogInfos.nom,
        surnoms: dogInfos.surnoms,
        date_de_naissanceDog: dogInfos.date_de_naissance,
        genre: dogInfos.genre,
        race: dogInfos.race,
        Sterilisation: dogInfos.Sterilisation,
        sante: dogInfos.sante,
        caractere: dogInfos.caractere,
        mesententes_chiens: dogInfos.mesententes_chiens,
        entente_chats: dogInfos.entente_chats,
        entente_enfants: dogInfos.entente_enfants,
        habitudes: dogInfos.habitudes,
        peurs: dogInfos.peurs,
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
    setDogInfosBackup(dogInfos);
    console.log(dogInfos)
  };

  const handleAccept = () => {
    setEditView(false);
    setEditColor('white')
    dispatch(modify({data: dogInfos}))
    handleModificationProfil()
  };

  const handleCancel = () => {
    setEditView(false);
    setDogInfos(dogInfosBackup);
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
                  onChangeText={(text) => setDogInfos({...dogInfos, nom: text})}
                  editable={editView}
                  value={dogInfos.nom}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Surnoms:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setDogInfos({...dogInfos, surnoms: text})}
                  editable={editView} 
                  value={dogInfos.surnoms}
                  multiline={true}
                  maxWidth="70%"
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Date de naissance:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  editable={editView} 
                  onChangeText={(text) => setDogInfos({...dogInfos, date_de_naissanceDog: text})}
                  value={dogInfos.date_de_naissanceDog}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
              >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Genre:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  onChangeText={(text) => setDogInfos({...dogInfos, genre: text})}
                  editable={editView} 
                  value={dogInfos.genre}
                  // maxLength= 10
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Race:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput} 
                  onChangeText={(text) => setDogInfos({...dogInfos, race: text})}
                  editable={editView} 
                  value={dogInfos.race}
                />
              </View>
              <FontAwesomeIcon icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Stérilisé(e):</Text>
                <View style={styles.containerCheckbox}>
                  <BouncyCheckbox
                    isChecked={dogInfos.sterilisation}
                    onPress={() => setDogInfos({...dogInfos, sterilisation : !dogInfos.sterilisation})} 
                    fillColor={"#008486"} 
                    unfillColor={"white"}
                    size={30}
                    innerIconStyle={styles.checkStyle}
                    disabled={!editView}/>
                </View>
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Problème de santé:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setDogInfos({...dogInfos, sante: text})}
                  editable={editView} 
                  value={dogInfos.sante}
                  multiline={true}
                  maxWidth="70%"
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Caractère:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setDogInfos({...dogInfos, caractere: text})}
                  editable={editView} 
                  value={dogInfos.caractere}
                  multiline={true}
                  maxWidth="70%"
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer} 
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Mésententes avec certaines races de chiens ? :</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setDogInfos({...dogInfos, mesententes_chiens: text})}
                  editable={editView} 
                  value={dogInfos.mesententes_chiens}
                  multiline={true}
                  maxWidth="70%"
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer}
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Entente avec les chats:</Text>
                <View style={styles.containerCheckbox}>
                  <BouncyCheckbox
                   isChecked={dogInfos.entente_chats}
                   onPress={() => setDogInfos({...dogInfos, entente_chats: !dogInfos.entente_chats})} 
                    fillColor={"#008486"} 
                    unfillColor={"white"}
                    size={30}
                    innerIconStyle={styles.checkStyle}
                    disabled={!editView}/>
                </View>
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor} onPress={() => handleModifier()}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer}
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Entente avec les enfants:</Text>
                <View style={styles.containerCheckbox}>
                  <BouncyCheckbox
                    isChecked={dogInfos.entente_enfants}
                    onPress={() => setDogInfos({...dogInfos, entente_enfants: !dogInfos.entente_enfants})} 
                    fillColor={"#008486"} 
                    unfillColor={"white"}
                    size={30}
                    innerIconStyle={styles.checkStyle}
                    disabled={!editView}/>
                </View>
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor} onPress={() => handleModifier()}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer}
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Ses habitudes:</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setDogInfos({...dogInfos, habitudes: text})}
                  editable={editView} 
                  value={dogInfos.habitudes}
                  multiline={true}
                  maxWidth="70%"
                />
              </View>
              <FontAwesomeIcon style={styles.icon} icon={faPenToSquare} color={editColor} onPress={() => handleModifier()}/>
            </Pressable>
            <Pressable 
              style={styles.singleInfoContainer}
              disabled={!editView}
            >
              <View style={styles.textInfoContainer}>
                <Text style={styles.text}>Peur(s) à signaler? :</Text>
                <TextInput 
                  style={editView ? styles.inputStyleEdit : styles.textInput}
                  onChangeText={(text) => setDogInfos({...dogInfos, peurs: text})}
                  editable={editView} 
                  value={dogInfos.peurs}
                  multiline={true}
                  maxWidth="70%"
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
    paddingTop: 5,
    paddingBottom: 5, 
  },
  photoNameContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
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
  containerCheckbox: {
    position: "absolute",
    left:250,
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
  checkStyle : {
    borderWidth: 0.5,
    borderColor : "#FFC547",
  },
})
