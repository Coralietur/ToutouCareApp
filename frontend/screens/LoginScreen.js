import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getEmail } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code_creche, setCode_creche] = useState("");

  const handleSubmit = () => {
    useEffect(() => {
      fetch("exp://192.168.10.134:19000/users/signin")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        });
      dispatch(getEmail(email));
      navigation.navigate("TabNavigator");
    }, []);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <Text style={styles.field}>Votre adresse email</Text>

      <TextInput
        placeholder="Nickname"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
      />

      <Text style={styles.field}>Votre mot de passe</Text>
      <TextInput
        placeholder="Nickname"
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.input}
      />

      <Text style={styles.field}>Votre code crèche</Text>
      <TextInput
        placeholder="Nickname"
        onChangeText={(value) => setCode_creche(value)}
        value={code_creche}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 30,
    backgroundColor: "#008486",
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "900",
    fontSize: 16,
  },
  field: {
    width: "80%",
    fontSize: 25,
    fontWeight: "600",
  },
});
