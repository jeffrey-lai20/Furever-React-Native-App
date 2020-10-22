import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    View,
    ScrollView,
  } from "react-native";
console.disableYellowBox = true;

import {sellerDetails} from "../components/sellerInfoComponent";

import { db } from "../database/firebase";

export default class sellerProfile extends React.Component {

    state = {
        data: [],
        isLoading: true,
        filteredData: [],
        searchText: "",
        visible: false,
        pullToRefresh: false,
    };
    
      async fetchData() {
        const uuid = this.props.route.params.item.uuid;

        await db
              .collection("users")
              .doc(uuid)
              .get()
              .then((user_doc) => {
                userPhoto = user_doc.data().photo;
                console.log(uuid);
                console.log(user_doc.data().name);

                let data = {
                  name: user_doc.data().name,
                  photo: userPhoto,
                  dob: this.props.route.params.item.sellerDob,
                  email: this.props.route.params.item.sellerEmail,
                  location: this.props.route.params.item.location,
                  info: this.props.route.params.item.sellerInfo,
                };
                
                this.setState({
                  isLoading: false,
                  data: data, 
                });
                console.log(data);
              });
              
      }

      async componentDidMount() {
        this.fetchData();
      }

    render() {
        return (
            <View style={{paddingBottom: 50}}>
                <ScrollView>
                    {sellerDetails(this.state.data)}                    
                </ScrollView>
            </View>
        );
    }
}