import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const { user } = useAuth();
	const [matchedUserInfo, setMatchedUserInfo] = useState(null);
	const [lastMessage, setLastMessage] = useState("");
	//getMatchedUserInfo a utility function to split off one of the users from the match, and display the matched user only
	useEffect(() => {
		setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
	}, [matchDetails, user]);

	//fetches the last message for displaying in the chat row item below name
	//can be imprve by limiting to 1 on db side to reduce call size
	useEffect(() => {
		onSnapshot(
			query(
				collection(db, "matches", matchDetails.id, "messages"),
				orderBy("timestamp", "desc")
			),
			(snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
		);
	}, [db, matchDetails]);

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("Message", {
					matchDetails,
				})
			}
			style={[
				tailwind(
					"flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
				),
				styles.cardShadow,
			]}
		>
			<Image
				style={tailwind("rounded-full h-16 w-16 mr-4")}
				source={{ uri: matchedUserInfo?.photoURL }}
			/>
			<View>
				<Text style={tailwind("text-lg font-semibold")}>
					{matchedUserInfo?.displayName}
				</Text>
				<Text>{lastMessage || "Say Hi!"}</Text>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	cardShadow: {
		shadowColor: "000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});

export default ChatRow;
