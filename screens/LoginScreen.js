import { useNavigation } from "@react-navigation/native";
import { TwitterAuthProvider } from "firebase/auth";
import React, { useLayoutEffect } from "react";
import {
	Button,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
	const { googleSignIn, loading } = useAuth();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<ImageBackground
				resizeMode="cover"
				source={{ uri: "https://tinder.com/static/tinder.png" }}
			>
				<Button title="Login" onPress={handleGoogleSignIn} />
				<TouchableOpacity>
					<Text>Sign in & get swipping</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;
