import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { TailwindProvider } from "tailwind-rn";
import { AuthContextProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";
import utilities from "./tailwind.json";

export default function App() {
	return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<AuthContextProvider>
					<StackNavigator />
				</AuthContextProvider>
			</NavigationContainer>
		</TailwindProvider>
	);
}
