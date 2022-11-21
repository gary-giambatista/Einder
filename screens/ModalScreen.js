import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const ModalScreen = () => {
	const navigation = useNavigation();
	const tailwind = useTailwind();
	const { user } = useAuth();

	const [image, setImage] = useState("");
	const [job, setJob] = useState("");
	const [age, setAge] = useState("");

	const incompleteForm = !image || !job || !age;

	const updateUserProfile = () => {
		setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			displayName: user.displayName,
			photoURL: image,
			job: job,
			age: age,
			timestamp: serverTimestamp(),
		})
			.then(() => {
				navigation.navigate("Home");
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<View style={tailwind("flex-1 items-center pt-1")}>
			<Image
				style={tailwind("h-20 w-full")}
				resizeMode="contain"
				source={{
					uri: "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Logo.png",
				}}
			/>

			<Text style={tailwind("text-xl text-gray-500 p-2 font-bold")}>
				Welcome {user.displayName}
			</Text>
			<Text style={tailwind("text-center p-4 font-bold text-red-400")}>
				Step 1: The Profile Pic
			</Text>
			<TextInput
				value={image}
				onChangeText={(text) => setImage(text)}
				style={tailwind("text-center text-xl pb-2")}
				placeholder="Enter a Profile Pic URL..."
			/>
			<Text style={tailwind("text-center p-4 font-bold text-red-400")}>
				Step 2: The Job
			</Text>
			<TextInput
				value={job}
				onChangeText={(text) => setJob(text)}
				style={tailwind("text-center text-xl pb-2")}
				placeholder="Enter your occupation..."
			/>
			<Text style={tailwind("text-center p-4 font-bold text-red-400")}>
				Step 3: The Age
			</Text>
			<TextInput
				value={age}
				onChangeText={(text) => setAge(text)}
				style={tailwind("text-center text-xl pb-2")}
				placeholder="Enter your age..."
				keyboardType="numeric"
				maxLength={2}
			/>
			<TouchableOpacity
				onPress={updateUserProfile}
				disable={incompleteForm}
				style={[
					tailwind("w-64 p-3 rounded-xl absolute bottom-10 bg-red-400"),
					incompleteForm ? tailwind("bg-gray-400") : tailwind("bg-red-400"),
				]}
			>
				<Text style={tailwind("text-center text-white text-xl")}>
					Update Profile
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ModalScreen;
