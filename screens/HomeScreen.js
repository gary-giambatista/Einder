import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Button,
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
	const navigation = useNavigation();
	const { user, logOut } = useAuth();
	const tailwind = useTailwind();
	console.log(user);
	return (
		<SafeAreaView>
			{/* Header */}
			<View
				style={tailwind(
					"flex flex-row justify-between px-5 py-1 items-center relative"
				)}
			>
				<TouchableOpacity style={tailwind("")} onPress={logOut}>
					<Image
						style={tailwind("h-10 w-10 rounded-full")}
						source={user.photoURL}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={tailwind("")}>
					<Image
						style={tailwind("h-[56px] w-[47px] object-contain")}
						source={require("../TinderLogo.png")}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={tailwind("")}>
					<Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
				</TouchableOpacity>
			</View>

			{/* end of header */}
			{/* <Text>I am the home screen.</Text>
			<Button
				title="Go to Chat screen."
				onPress={() => navigation.navigate("Chat")}
			/>
			<Button title="Logout" onPress={logOut} /> */}
		</SafeAreaView>
	);
};

export default HomeScreen;
