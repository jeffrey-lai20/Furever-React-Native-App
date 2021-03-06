import React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-paper";
import styles from "../styleSheet/styleSheet";
import { primaryColour1, primaryColour2 } from "../styleSheet/styleSheet";
import { addItemToCart } from "../components/shopComponents";

//Get Screen Width
const screenWidth = Math.round(Dimensions.get("window").width);

//Profile Information
export const profileInfo = (item) => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: screenWidth, height: 250 }}
            source={{
              uri: item.photo,
            }}
          />
        </View>
        <Card containerStyle={styles.cardContentContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
            {item.accessoryName}
          </Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>General Information</Text>
          <View style={styles.cardContainer}>
            <View style={{ paddingLeft: 1, paddingRight: 15 }}>
              <Text style={styles.contentTextBold}>Name: </Text>
              <Text style={styles.contentTextBold}>Category: </Text>
              <Text style={styles.contentTextBold}>Type: </Text>
              <Text style={styles.contentTextBold}>Price: </Text>
              <Text style={styles.contentTextBold}>Description: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.accessoryName}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.category}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.type}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                ${item.price}
              </Text>
              <Text style={styles.contentText}>{item.description}</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

export const addToCartButton = (item) => {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        color={primaryColour1}
        onPress={() => addItemToCart(item)}
        contentStyle={{
          height: 30,
        }}
        mode="contained"
      >
        <Text style={{ color: "white" }}>Add To Cart</Text>
      </Button>
    </View>
  );
};

export const sellerInfo = (seller, navigation) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>Seller Information</Text>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
              source={{
                uri: seller.photo,
              }}
            />
            <Text style={{ textAlign: "center", paddingTop: 5 }}>
              {seller.name}
            </Text>
          </View>
          <View
            style={{
              flex: 4,
              paddingTop: 2,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text>{seller.profileText}</Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Button
                style={{
                  backgroundColor: primaryColour2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: 25,
                  width: 120,
                }}
                mode="contained"
                onPress={() => navigation.navigate("sellerProfile", { seller })}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                    padding: 5,
                    fontWeight: "bold",
                  }}
                >
                  More Info
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
