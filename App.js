import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AuthContextProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
	const tailwind = useTailwind();

	return (
		<NavigationContainer>
			<AuthContextProvider>
				<StackNavigator />
			</AuthContextProvider>
		</NavigationContainer>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });
