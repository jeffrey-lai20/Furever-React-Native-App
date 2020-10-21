import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import { AppLoading } from "expo";
import SelfPetListing from "./petListing";
import { auth } from "../../database/firebase";
import {onSellTab} from "../../components/petTabComponents";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../../styleSheet/styleSheet";

const db = firebase.firestore();

export default class currentListings extends React.Component {
  state = {
    data: [],
    lists: null,
    isLoading: true,
    pullToRefresh: false,
  };


async fetchData() {
    const dataArray = [];
    const user = auth.currentUser;

    db.collection("pet_listings")
      .where("uuid", "==", user.uid)
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
          // console.log(listingDoc.data());
          dataArray.push({
            petName: listingDoc.data().name,
            category: listingDoc.data().category,
            breed: listingDoc.data().breed,
            colour: listingDoc.data().colour,
            age: listingDoc.data().age,
            gender: listingDoc.data().gender,
            size: listingDoc.data().size,
            location: listingDoc.data().location,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            additionalInfo: listingDoc.data().additionalInfo,
            photo: listingDoc.data().photo_link,
            doc_id: listingDoc.id
          });

          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
}
  async componentDidMount() {
    this.fetchData();
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.activityContainer}>
    //       <ActivityIndicator size="large" color="#447ECB" />
    //     </View>
    //   );
    // }
    return (
      <View>
        {onSellTab(this.props.navigation)}

        <View style={{ height: 70, padding: 10, flexDirection: "row"}}>
          <Text
            style={{ textAlign: "center", padding: 10, fontWeight: "bold", fontSize: 20 }}>
            Current Listings
          </Text>

          <View style={{height: 40, width: 220, paddingTop: 8}}>
          <TouchableOpacity
            // style={styles.viewApplication}
            style={{
              backgroundColor: darkGreen,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.props.navigation.navigate("sellApplication")}>
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                fontWeight: "bold",
              }}>
              Add New Listing
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.cardContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={async () => {
                this.setState({
                  pullToRefresh: true,
                });
                await this.fetchData();
                this.setState({
                  pullToRefresh: false,
                });
              }}
              refreshing={this.state.pullToRefresh}
            data={this.state.data}
            renderItem={({ item }) => (
              <SelfPetListing
                petName={item.petName}
                category={item.category}
                breed={item.breed}
                colour={item.colour}
                age={item.age}
                gender={item.gender}
                size={item.size}
                location={item.location}
                price={item.price}
                behaviour={item.behaviour}
                health={item.health}
                training={item.training}
                additional={item.additionalInfo}
                photo={item.photo}
                doc_id={item.doc_id}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  categories: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  iconContainer: {
    padding: 20,
  },
  viewApplication: {
    backgroundColor: "#447ECB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
  },
  listBox: {
    // width: 50,
    // height: 1,
    alignSelf: "stretch",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#000",
    padding: 10,
    margin: 20,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
      paddingBottom: 220
    // flex: 2,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
});
