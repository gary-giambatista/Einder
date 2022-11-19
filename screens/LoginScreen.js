import { useNavigation } from "@react-navigation/native";
import { TwitterAuthProvider } from "firebase/auth";
import React, { useLayoutEffect } from "react";
import {
	Button,
	ImageBackground,
	StyleSheet,
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
		<View style={styles.container}>
			<ImageBackground
				resizeMode="cover"
				style={styles.container}
				source={{ uri: "https://tinder.com/static/tinder.png" }}
			>
				<TouchableOpacity style={styles.touch} className="items-center">
					<Text style={styles.text}> Sign in & get swiping </Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
	},
	text: {
		color: "black",
		fontWeight: "semi-bold",
		fontSize: 20,
	},
	touch: {
		position: "absolute",
		bottom: 170,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 6,
	},
});

export default LoginScreen;
