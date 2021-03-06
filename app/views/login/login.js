import React from "react";
import { auth, db } from "../database/firebase";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { Input } from "react-native-elements";
import globalStyles, { primaryColour1 } from "../styleSheet/styleSheet";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  //Login Handler
  onLogin() {
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (e) => {
        const user = auth.currentUser;
        if (user.emailVerified) {
          var isFirstTime;
          await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((user_doc) => {
              isFirstTime = user_doc.data().isNewUser;
            });
          if (isFirstTime) {
            this.props.navigation.replace("Setup One");
          } else {
            this.props.navigation.replace("Home");
          }
        } else {
          this.props.navigation.replace("Home");
          Alert.alert("Alert", "Email address it not verified.");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
    this.setState({ email: "" });
    this.setState({ password: "" });
  }

  //Forgot Password Handler
  onForgotPassword(email) {
    auth
      .sendPasswordResetEmail(email)
      .then((e) => {
        Alert.alert(
          "Alert",
          `A password reset email has been sent to ${email}`
        );
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }

  render() {
    return (
      <View style={globalStyles.loginLogoContainer}>
        <Image
          style={globalStyles.loginLogo}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=37437e7d-7cb4-43e4-a567-6cfe5f109989",
          }}
        />
        <View style={globalStyles.loginInputContainer}>
          <Input
            placeholder="EMAIL"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            leftIcon={{
              type: "ionicons",
              name: "mail-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
          />
          <Input
            placeholder="PASSWORD"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={globalStyles.loginButtonsContainer}>
          <TouchableOpacity
            style={globalStyles.landingButtons}
            onPress={this.onLogin.bind(this)}>
            <Text style={globalStyles.landingButtonsText}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            style={globalStyles.loginTitle}
            onPress={() => this.props.navigation.replace("Forgot Password")}>
            FORGOT PASSWORD?
          </Text>
          <Text
            style={globalStyles.loginTitle2}
            onPress={() => this.props.navigation.replace("Sign Up")}>
            NO ACCOUNT? <Text style={globalStyles.linkText}>{"SIGN UP"}</Text>
          </Text>
        </View>
      </View>
    );
  }
}
