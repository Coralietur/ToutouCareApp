import React from "react";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { useSelector } from "react-redux";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Modal,
  ScrollView,
} from "react-native";

import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
const BACKEND_ADDRESS = 'http://192.168.1.32';

export default function InvoicesScreen() {
  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const userToken = useSelector((state) => state.user.value.data.token);
  const user = useSelector((state) => state.user.value.data);


  let pdfUrl = "https://www.orimi.com/pdf-test.pdf";
  //download pdf

  const downloadPdf = () => {
    Linking.openURL(pdfUrl);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [factureData, setFactureData] = useState([]);

  const [factureDataDate, setFactureDataDate] = useState([]);
  const [dataBool, setDataBool] = useState(false);

  const data = [
    { key: "1", value: "Janvier 2022" },
    { key: "2", value: "Février 2022" },
    { key: "3", value: "Mars 2022" },
    { key: "4", value: "Avril 2022" },
    { key: "5", value: "Mai 2022" },
    { key: "6", value: "Juin 2022" },
    { key: "7", value: "Juillet 2022" },
    { key: "8", value: "Août 2022" },
    { key: "9", value: "Septembre 2022" },
    { key: "10", value: "Octobre 2022" },
    { key: "11", value: "Novembre 2022" },
    { key: "12", value: "Décembre 2022" },
  ];

  console.log("userToken", dateTo);

  const findInvoices = () => {
    fetch(`${BACKEND_ADDRESS}:3000/invoices/${dateFrom}/${dateTo}/${userToken}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setModalVisible(!modalVisible);
          console.log("ss", data);

          setFactureDataDate(data);
          setDataBool(true);
        } else {
          alert("Aucune facture disponible pour cette période");
        }
      });
  };

  const resourceType = "base64";

  useEffect(() => {
    console.log(userToken);

    fetch(`${BACKEND_ADDRESS}:3000/invoices/getInvoices/${userToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          console.log("ss", data);
          setFactureData(data);
          setDataBool(true);
        } else {
          setDataBool(false);
          console.log("no data");
        }
      });
  }, []);

  const diplayedInvoicesDated = factureDataDate.map((data) => {
    console.log("dare", data.date);

    if (dataBool) {
      const html = `
<html>
    <body>
    <h1>TouTouCareApp</h1>
        <h2>Facture du <span>${data.date.split("T")[0]}</span></h2>
        <h4>Bonjour ${user.nom}</h4>
        <h4>Voici votre facture pour ce jour : <br>
        <span>${data.prix} €</span> </h4>

        <ul class="footer">
        </ul>

    </body>

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
    h1{
      width:100%;
      font-family:"Montserrat";
      font-weight:800;
      text-align:"center";
      font-size:50px;
      margin-bottom:290px;

    }
    h2{
      width:100%;
      font-family:"Montserrat";
      text-align:"center";
      font-size:30px;
    
    }

    h2>span{
      color: F12054;
      font-weight:800;
      font-size:30px;
    }


    h4{
      font-family:"Montserrat";
      font-size:30px;
    
    }

    footer{
      left:0;
      position:fixed;
      bottom:0;
      width:100%;
      height:10rem;
      background-color:#008486;
      
    }


    </style>
</html>
`

      const generatePdf = async () => {
        const file = await printToFileAsync({
          html: html,
          base64: false,
        });
        await shareAsync(file.uri);
      };
      const dateSplit = data.date.split("T")[0];
      return (
        <>
          <View style={styles.listFactures}>
            <Text style={styles.text}>Facture du {dateSplit}</Text>
            <TouchableOpacity
              onPress={() => {
                alert("Téléchargement de votre facture");
                generatePdf();
              }}
            >
              <Image
                style={styles.iconePdf}
                source={require("../assets/iconePdf.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.listFactures}>
          <Text style={styles.textNoDispo}>Aucune facture disponible</Text>
        </View>
      );
    }
  });

  const displayedInvoices = factureData.map((data) => {
    
    const html = `
    <html>
        <body>
        <img src='./assets/logostyleompbre.png' alt="Logo" border="0">
        <h1>TouTouCareApp</h1>
            <h2>Facture du <span>${data.date.split("T")[0]}</span></h2>
            <h4>Bonjour ${user.nom}</h4>
            <h4>Voici votre facture pour ce jour : <br>
            <span>${data.prix} €</span> </h4>
             <ul class="footer">
            </ul>
        </body>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
        h1{
          width:100%;
          font-family:"Montserrat";
          font-weight:800;
          text-align:"center";
          font-size:50px;
          margin-bottom:290px;
        }
        h2{
          width:100%;
          font-family:"Montserrat";
          text-align:"center";
          font-size:30px; 
        }
    
        h2>span{
          color: F12054;
          font-weight:800;
          font-size:30px;
        }
        h4{
          font-family:"Montserrat";
          font-size:30px;     
        }
    
        footer{
          left:0;
          position:fixed;
          bottom:0;
          width:100%;
          height:10rem;
          background-color:#008486;
          
        }
        </style>
    </html>
    `;
    console.log("dare", data.date);
    if (dataBool) {

      const generatePdf = async () => {
        const file = await printToFileAsync({
          html: html,
          fileName:`FactureDu${data.date.split("T")[0]}`,
          base64: false,
          
        });
        await shareAsync(file.uri);
      };

      const dateSplit = data.date.split("T")[0];
      return (
        <>
          <View style={styles.listFactures}>
            <Text style={styles.text}>Facture du {dateSplit}</Text>

            <TouchableOpacity onPress={()=>{
              
              alert("Téléchargement de votre facture")
              generatePdf()}}>
              <Image
                style={styles.iconePdf}
                source={require("../assets/iconePdf.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.listFactures}>
          <Text style={styles.textNoDispo}>Aucune facture disponible</Text>
        </View>
      );
    }
  });

  return (
    <>
    
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        style={styles.Modal}
      >
        <SafeAreaView>
          <Text style={styles.titleModal}>Toutes vos factures</Text>
          <Text style={styles.subtitleModal}>
            Comprises du
            <Text style={styles.span}> {dateFrom.toDateString()} </Text>
            au
            <Text style={styles.span}> {dateTo.toDateString()} </Text>
          </Text>

          <ScrollView style={styles.scrollViewModal}>
            {diplayedInvoicesDated}
          </ScrollView>

          <TouchableOpacity
            style={styles.buttonFermer}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textButtonFermer}>Fermer</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <SafeAreaView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle={"dark-content"} />
        <ScrollView>
          <View style={styles.headerContainer}>
            <Image
              style={styles.profilPicture}
              source={require("../assets/chiencoralie.png")}
            ></Image>

            <Text style={styles.titleHead}>Vos factures</Text>
          </View>

          <View style={styles.mainContainer}>
            <Text style={styles.titleMain}>Votre dernière facture</Text>

            <View style={styles.containerHistorique}>
              {displayedInvoices[0]}
            </View>

            <View style={styles.bar}></View>

            <Text style={styles.titleMain}>Historique des factures</Text>

            <Text style={styles.subTitleMain}>Période :</Text>

            <View style={styles.containerDatePicker}>
              <View style={styles.from}>
                <Text style={styles.text}>De :</Text>
                <RNDateTimePicker
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDateFrom(currentDate);
                  }}
                  value={dateFrom}
                />
              </View>
              <View style={styles.to}>
                <Text style={styles.text}>À :</Text>
                <RNDateTimePicker
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDateTo(currentDate);
                  }}
                  dateFormat="dayofweek day month"
                  value={dateTo}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={() => {
                findInvoices();
              }}>
              <Text style={styles.buttonText}>Rechercher</Text>
              <FontAwesome
                name="search"
                style={styles.iconSearch}
                size={20}
                color="#fff"
              ></FontAwesome>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewModal: {
    height: 200,
    marginRight: "auto",
    marginLeft: "auto",
    width: 300,
    marginBottom: 20,
  },

  span: {
    color: "#FF5A5F",
  },

  titleModal: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  subtitleModal: {
    padding: 5,
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 200,
    marginTop: 60,
  },

  ModalView: {
    display: "none",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  Modal: {
    display: "none",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  containerDatePicker: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  from: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textNoDispo: {
    width: "100%",
    textAlign: "center",
    fontSize: 17,
    textAlign: "center",
    color: "#C4C4C4",
  },
  buttonFermer: {
    width: 200,
    paddingVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "#F12054",
    borderRadius: 10,
  },
  textButtonFermer: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
  to: {
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  text: {
    fontSize: 17,
  },
  mainContainer: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  titleMain: {
    fontSize: 19,
    marginTop: 40,
    fontWeight: "700",
  },

  profilPicture: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },

  listFactures: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerContainer: {
    marginTop: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },

  scrollViewInvoices: {
    width: "100%",
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

  titleHead: {
    fontSize: 27,
  },

  bar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,

    marginTop: 50,
    backgroundColor: "red",
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: "white",
    width: "50%",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "70%",
    marginTop: 30,
    backgroundColor: "#008486",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "900",
    fontSize: 17,
  },
  field: {
    width: "80%",
    fontSize: 25,
    fontWeight: "600",
  },

  titleHistorique: {
    color: "rgba(0,0,0,0.4)",
  },

  subTitleMain: {
    marginBottom: 22,
    marginTop: 12,
    fontSize: 20,
    color: "rgba(0,0,0,0.4)",
  },

  containerHistorique: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 100,

    borderRadius: 12,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  iconePdf: {
    width: 30,
    height: 30,
  },
  buttonSearch: {
    flexDirection: "row",

    justifyContent: "space-between",
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 220,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 19,
    textAlign: "center",
    color: "white",
  },
});
