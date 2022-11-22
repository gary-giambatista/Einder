import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TwitterAuthProvider } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { default as React, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
	const navigation = useNavigation();
	const tailwind = useTailwind();
	const { user } = useAuth();

	const [matches, setMatches] = useState([]);

	//retreive matches and map the results into matches state
	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "matches"),
					where("userMatched", "array-contains", user.uid)
				),
				(snapshot) =>
					setMatches(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[user]
	);

	//conditionally return/render matches otherwise return view with no matches
	return matches.length > 0 ? (
		//map out the ChatRow's here for each match
		<FlatList
			style={tailwind("h-full")}
			data={matches}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <ChatRow matchDetails={item} />}
		/> //flatlist is the best way to map out a list of a component, has default scrollable behavior
	) : (
		<View style={tailwind("")}>
			<Text style={tailwind("text-center")}>No matches at the moment</Text>
		</View>
	);
};

export default ChatList;
