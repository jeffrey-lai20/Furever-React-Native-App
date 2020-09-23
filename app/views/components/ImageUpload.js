import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase/app";
import "firebase/storage";
import React, { Component } from "react";
import { Button, StyleSheet } from "react-native";

export const openImagePicker = async () => {
  // ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: "Images"
  //   }).then((result)=>{

  //     if (!result.cancelled) {
  //       // User picked an image
  //       const {height, width, type, uri} = result;
  //         console.log(uri);
  //       return uri;
  //     } else {
  //         return "err";
  //     }
  //   });

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
  });

  if (!result.cancelled) {
    const { height, width, type, uri } = result;
    return uri;
  }
};

export const uploadPhoto = (uri, uuid) => {
    fetch(uri)
    .then((result) => result.blob())
    .then((blob) => {
      var storageRef = firebase.storage().ref();

      storageRef
        .child("user_uploads/images/" + uuid)
        .put(blob)
        .then((snapshot) => {
          console.log("File succesfully uploaded", snapshot);
        })
        .catch((error) => {
          console.log("Error during file upload", error);
        });
    });
}

// export default function openImagePicker();