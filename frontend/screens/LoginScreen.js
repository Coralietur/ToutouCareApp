import {
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,  
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { collectData } from "../reducers/user";




const BACKEND_ADDRESS = "http://192.168.1.32";

export default function LoginScreen({ navigation }) {


  useEffect(() => {
    console.disableYellowBox = true;
  }, [])
  

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codeCreche, setCode_creche] = useState("");
  const [checked, setChecked] = useState(false);
  

  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  let textVerifMail;
  console.log("ko");
  if (email.length > 5 && !email.match(regexMail)) {
    textVerifMail = "Votre adresse mail n'est pas valide";
  } else if (email.match(regexMail)) {
    textVerifMail = "";
  }

  const connexion = () => {
    fetch(`${BACKEND_ADDRESS}:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        codeCreche: codeCreche,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(collectData(data));
        if (data.result) {
          navigation.navigate("TabNavigator", { screen: "Home" });
        } else {
          Alert.alert(data.error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <View style={styles.TitleContent}>
        <Image style ={styles.image} source={require('../assets/logo_ombré.png')} accessibilityLabel="logo Toutoucare"/>
        <Text style={styles.title}>Bienvenue sur ToutouCare</Text>
        </View>
        <Text style={styles.contentText}>Votre application de gestion de crèche canine</Text>
      <View style={styles.containerInput}>

        <TextInput
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
          value={email}
          style={styles.input}
          placeholder="Adresse email"
          keyboardType={'email-address'}
          outlined
        />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
          enablesReturnKeyAutomatically
          style={styles.input}
          outlined
        />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          onChangeText={(value) => setCode_creche(value)}
          value={codeCreche}
          placeholder="Code crèche"
          style={styles.inputCreche}
          outlined
        />
      </View>

      <View style={styles.containerCheckbox}>
        <BouncyCheckbox
          onPress={(isChecked) => {setChecked}} 
          fillColor={"#008486"} 
          unfillColor={"white"}
          size={30}
          innerIconStyle={styles.checkStyle}/>
        <Text style={styles.textSC}>Restez connecté</Text>
      </View>

      <TouchableOpacity
        onPress={() => connexion()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <Text style={styles.textVerifMail}>{textVerifMail}</Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFDBD5",
    alignItems: "center",
    justifyContent: "center",
    padding:10,
  },
  TitleContent : {

    justifyContent: 'space-between',
    padding: 8,
    flexDirection:'row',
    alignItems:'center'
  },
  title : {
    fontSize: 30,
    paddingHorizontal : 5,
    color : "#365B58",

  },
  contentText : {
    fontSize: 15,
    marginTop:12,
    marginBottom:12,
    fontStyle:"italic",
    paddingHorizontal : 5,
    alignSelf: "center",
    color : "#365B58",
  },
  image : {
    padding:5,
    marginRight: 10,
    marginLeft :10,
    width:100,
    height:100,
    alignSelf: "center",
    },
  containerCheckbox: {
    justifyContent: "center",
    width: 300,
    flexDirection: "row",
    alignItems: "center",
  },

  containerInput: {
    flexDirection:'row',
    width: 300,
    alignSelf:"center",
    justifyContent:"center",
  },

  textVerifMail: {
    textAlign: "center",
    color: "#F12054",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    marginVertical: 12,
    padding: 12,
    fontSize: 18,
    backgroundColor: "white",
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignSelf:"center",
  },
  inputCreche: {
    padding: 12,
    marginVertical: 12,
    fontSize: 18,
    backgroundColor: "white",
    width: 150,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
  },
  checkStyle : {
    borderWidth: 2,
    borderColor : "black"
  },
  button: {
    width: 300,
    marginTop: 20,
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
    alignSelf: "center",
  },

  // alignItems: "center",
  // paddingTop: 8,
  // width: "70%",
  // marginTop: 30,
  // backgroundColor: "#008486",
  // borderRadius: 10,
  // marginBottom: 10,
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",

    fontSize: 20,
  },
  field: {
    width: "80%",
    fontSize: 15,
    fontWeight: "600",
  },
  textSC: {
    fontSize: 17,
    fontWeight: "700",
  },
});
