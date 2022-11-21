import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const MatchedScreen = () => {
	const navigation = useNavigation();
	const { params } = useRoute();
	const tailwind = useTailwind();

	const { loggedInProfile, userSwiped } = params;

	return (
		<View style={[tailwind("h-full bg-red-500 pt-20"), { opacity: 0.89 }]}>
			<View styles={tailwind("justify-center px-10 pt-20")}>
				<Image
					style={tailwind("h-20 w-full")}
					source={{ uri: "https://links.papareact.com/mg9" }}
				/>
			</View>
			<Text style={tailwind("text-white text-center mt-5")}>
				You and {userSwiped.displayName} haved liked each other.
			</Text>
			<View style={tailwind("flex-row justify-evenly mt-5")}>
				<Image
					style={tailwind("h-32 w-32 rounded-full")}
					source={loggedInProfile.photoURL}
				/>
				<Image
					style={tailwind("h-32 w-32 rounded-full")}
					source={userSwiped.photoURL}
				/>
			</View>
			<TouchableOpacity
				style={tailwind("bg-white m-5 px-10 py-8 rounded-full mt-20")}
				onPress={() => {
					navigation.goBack();
					navigation.navigate("Chat");
				}}
			>
				<Text style={tailwind("text-center")}>Send a Message</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MatchedScreen;
