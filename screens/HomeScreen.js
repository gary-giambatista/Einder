import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
	const navigation = useNavigation();
	const { logOut } = useAuth();

	return (
		<View>
			<Text>I am the home screen.</Text>
			<Button
				title="Go to Chat screen."
				onPress={() => navigation.navigate("Chat")}
			/>
			<Button title="Logout" onPress={logOut} />
		</View>
	);
};

export default HomeScreen;
