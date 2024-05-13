import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContentProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isLoggedIn && <AuthStack />}
      {isLoggedIn && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem("token");
      if (token) authenticate(token);
      SplashScreen.hideAsync();
    }

    getTokenFromStorage();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContentProvider>
        <Root />
      </AuthContentProvider>
    </>
  );
}
