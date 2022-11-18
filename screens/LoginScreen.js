import React from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
	const { googleSignIn } = useAuth();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<Text>Login to the app.</Text>
			<Button title="Login" onPress={handleGoogleSignIn} />
		</View>
	);
};

export default LoginScreen;
