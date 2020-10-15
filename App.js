import * as React from "react";
import LandingPage from "./app/views/login/landingPage";
import Login from "./app/views/login/login";
import SignUp from "./app/views/login/signup";
import Home from "./app/views/home/home";
import HeaderLogo from "./app/views/login/headerLogo";
import PasswordRecoveryPage from "./app/views/login/passwordRecoveryPage";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { setCustomText } from "react-native-global-props";
import { AppLoading } from "expo";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter"; ////////////////

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pet Search"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#447ECB",
            },
            headerTitle: <HeaderLogo />,
            headerTitleStyle: {
              alignSelf: "center",
              flex: 1,
              paddingBottom: Platform.OS === "web" ? 0 : 5,
            },
            headerTitleContainerStyle: { left: 0, right: 0 },
          }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={PasswordRecoveryPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
