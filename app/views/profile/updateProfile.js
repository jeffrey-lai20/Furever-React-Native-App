import * as React from "react";
import { ActivityIndicator } from "react-native";
import { View, Image, Text, BackHandler, StyleSheet } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import { openImagePicker, uploadPhoto } from "../components/ImageUpload";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
import uuid from "react-native-uuid";
import { Avatar, Accessory, Input } from "react-native-elements";

export default class updateProfile extends React.Component {
  constructor(props) {
    super(props);
    const profileData = this.props.route.params.data;

    this.state = {
      name: profileData.name,
      photo: profileData.photo,
      profileText: profileData.profileText,
      photo_uuid: "",
      photo_uri: "",
      prevName: profileData.name,
      prevProfileText: profileData.profileText,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }

  async handleUpdate() {
    //   console.log("hi");
    console.log("photo uri" + this.state.photo_uri);
    if (this.state.photo != "" && this.state.photo_uri != null) {
      const photoURL = await uploadPhoto(
        this.state.photo,
        this.state.photo_uuid
      );

      this.setState({
        photo: photoURL,
      });
    }

    // console.log(this.state.photo);

    const user = auth.currentUser;
    // console.log(user.uid);

    db.collection("users").doc(user.uid).update({
      photo: this.state.photo,
      name: this.state.name,
      profileText: this.state.profileText,
    });

    console.log("hi");
    this.props.route.params.refresh();
    this.props.navigation.goBack();
  }

  setPhotoUri = async () => {
    const get_uri = await openImagePicker();
    if (get_uri != null) {
      this.setState({
        photo_uuid: uuid.v4(),
        photo: get_uri,
      });
    }
  };

  // const navigation = props.route.params.navigation;
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#447ECB",
            borderBottomRightRadius: 1000,
            borderBottomLeftRadius: 1000,
            transform: [{ scaleX: 2 }],
            overflow: "hidden",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                marginTop: 60,
                color: "#F5F5DC",
                transform: [{ scaleX: 0.5 }],
              }}>
              Edit Profile
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <View style={{ opacity: 0.1, position: "absolute" }}>
              <Image
                style={{
                  left: 140,
                  width: 750 / 1.7,
                  height: 610 / 1.7,
                }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogoDogWhite.png?alt=media&token=d2ba6451-beeb-4815-8782-a31601436e20",
                }}
              />
            </View>
            <Avatar
              size={150}
              rounded
              renderPlaceholderContent={<ActivityIndicator />}
              source={{
                uri: this.state.photo,
              }}>
              <Accessory size={45} onPress={this.setPhotoUri} />
            </Avatar>
          </View>
        </View>

        <View style={{ marginHorizontal: 50, marginTop: 30 }}>
          <View>
            <Input
              label="Display Name"
              labelStyle={{ color: "#447ECB" }}
              onChangeText={(name) => this.setState({ name })}
              placeholder={this.state.prevName}
              // defaultValue={this.state.name}
            />

            <Input
              label="Profile Text"
              labelStyle={{ color: "#447ECB" }}
              onChangeText={(profileText) => this.setState({ profileText })}
              multiline
              placeholder={this.state.prevProfileText}
              // defaultValue={this.state.profileText}
            />

            <View style={{ alignItems: "center", marginTop: 25 }}>
              <Button
                mode="outlined"
                style={styles.buttons}
                onPress={() => this.handleUpdate()}>
                <Text style={styles.buttonsText}> Update </Text>
              </Button>
            </View>
            {/* <Text>{this.state.profileData.name}</Text> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  avatarContainer: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    transform: [{ scaleX: 0.5 }],
  },
  borderBottom: {
    //   borderBottomColor: "grey",
    //   borderBottomWidth: 1
  },
  buttons: {
    borderWidth: 1,
    borderColor: "#447ECB",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: "#447ECB",
    fontSize: 18,
    padding: 15,
  },
});
