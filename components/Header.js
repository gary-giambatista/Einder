import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TwitterAuthProvider } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const Header = ({ title, callEnabled }) => {
	const navigation = useNavigation();
	const tailwind = useTailwind();

	return (
		<View style={tailwind("p-2 flex-row items-center justify-between")}>
			<View style={tailwind("flex flex-row items-center")}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={tailwind("p-2")}
				>
					<Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
				</TouchableOpacity>
				<Text style={tailwind("text-2xl font-bold")}>{title}</Text>
			</View>

			{callEnabled && (
				<TouchableOpacity style={tailwind("rounded-full p-3 bg-red-200")}>
					<Foundation
						style={tailwind("")}
						name="telephone"
						size={20}
						color="red"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Header;
