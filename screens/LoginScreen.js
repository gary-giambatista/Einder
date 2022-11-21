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
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
	const { googleSignIn, loading } = useAuth();
	const navigation = useNavigation();
	const tailwind = useTailwind();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={tailwind("flex-1")}>
			<ImageBackground
				resizeMode="cover"
				style={tailwind("flex-1")}
				source={{ uri: "https://tinder.com/static/tinder.png" }}
			>
				<TouchableOpacity
					style={[
						tailwind("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
						{ marginHorizontal: "25%" },
					]}
					onPress={handleGoogleSignIn}
				>
					<Text style={tailwind("font-semibold text-center")}>
						{" "}
						Sign in & get swiping{" "}
					</Text>
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
