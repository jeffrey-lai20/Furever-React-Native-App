import * as React from "react";
import { ActivityIndicator } from "react-native";
import { Alert, View, Image, Text } from "react-native";
import {
  List,
  Divider,
} from "react-native-paper";
import { auth } from "../database/firebase";
import { Avatar } from "react-native-elements";
import globalStyles, { pageBackgroundColour } from "../styleSheet/styleSheet";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  //Logout Handler
  logout(props) {
    auth
      .signOut()
      .then(function () {
        Alert.alert("Logged Out", "Successfully signed out of Furever!");
        props.navigation.navigate("Pet Search");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ backgroundColor: pageBackgroundColour }}>
        <View style={globalStyles.profileContainer}>
          <View style={globalStyles.avatarContainer}>
            <View style={globalStyles.dogBackground}>
              <Image
                style={globalStyles.dogImage}
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
                uri: this.props.data.photo,
              }}
            ></Avatar>

            <View style={globalStyles.nameEmailContainer}>
              <View style={globalStyles.shortLine}>
                <Text style={globalStyles.profileName}>
                  {this.props.data.name}
                </Text>
              </View>
              <Text style={globalStyles.emailStyle}>
                {this.props.data.email}
              </Text>
            </View>
          </View>
        </View>

        <List.Item
          title="Edit Profile"
          left={(props) => <List.Icon {...props} icon="pencil" />}
          style={globalStyles.listStyle}
          onPress={() =>
            this.props.navigation.navigate("updateProfile", {
              data: this.props.data,
              refresh: () => this.props.refresh(),
            })
          }
        />
        <Divider style={globalStyles.divider} />
        <List.Item
          title="Privacy and Security"
          left={(props) => <List.Icon {...props} icon="security" />}
          onPress={() => this.props.navigation.navigate("profilePrivacy")}
          style={globalStyles.listStyle}
        />
        <Divider style={globalStyles.divider} />
        <List.Item
          title="Help and Support"
          left={(props) => <List.Icon {...props} icon="help" />}
          onPress={() => this.props.navigation.navigate("profileHelp")}
          style={globalStyles.listStyle}
        />
        <Divider style={globalStyles.divider} />
        <List.Item
          title="Logout"
          onPress={() => this.logout(this.props)}
          left={(props) => <List.Icon {...props} icon="door" />}
          style={globalStyles.listStyle}
        />
        <Divider style={globalStyles.divider} />
      </View>
    );
  }
}
