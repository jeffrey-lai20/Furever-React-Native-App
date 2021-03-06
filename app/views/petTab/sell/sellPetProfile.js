import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { ScrollView, View, BackHandler } from "react-native";
import { profileInfo } from "../../components/petProfileComponents";
console.disableYellowBox = true;

export default class sellPetProfile extends React.Component {
  //Handle back button
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

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    const item = this.props.route.params.item;
    return (
      <View>
        <ScrollView>
          {profileInfo(item)}
          <View style={{ padding: 10 }}></View>
        </ScrollView>
      </View>
    );
  }
}
