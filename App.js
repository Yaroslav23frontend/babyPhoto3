import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import MainScreen from "./app/screens/MainScreen";
import EditorScreen from "./app/screens/EditorScreen";
import ActiveProivider from "./app/context/ActiveContext";
import IdProivider from "./app/context/IdContext";
import FilterScreen from "./app/screens/FilterScreen";
import RotateScreen from "./app/screens/RotateScreen";
import FrameScreen from "./app/screens/FrameScreen";
import ScaleRotateProvider from "./app/context/ScaleRotateContext";
import FiltersProvider from "./app/context/FiltersContext";
import RNBootSplash from "react-native-bootsplash";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ActiveProivider>
        <IdProivider>
          <ScaleRotateProvider>
            <FiltersProvider>
              <NavigationContainer onReady={() => RNBootSplash.hide()}>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                  }}
                >
                  <Stack.Screen name="Home" component={MainScreen} />
                  <Stack.Screen name="Editor" component={EditorScreen} />
                  <Stack.Screen name="Filters" component={FilterScreen} />
                  <Stack.Screen name="Rotate" component={RotateScreen} />
                  <Stack.Screen name="Frame" component={FrameScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </FiltersProvider>
          </ScaleRotateProvider>
        </IdProivider>
      </ActiveProivider>
    </Provider>
  );
}
