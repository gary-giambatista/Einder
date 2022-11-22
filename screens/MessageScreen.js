import { useNavigation, useRoute } from "@react-navigation/native";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	Button,
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import Header from "../components/Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const MessageScreen = () => {
	const navigation = useNavigation();
	const tailwind = useTailwind();
	const { user } = useAuth();
	//use params as part of react-navigation to pass props onPress in ChatRow's TouchableOpacity. Passes in the {object{object}} and use the getMatchedUserInfo function to filter to the matches name as title
	const { params } = useRoute();
	const matchDetails = params;

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	//realtime listener to listen on realtime status of messages
	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "matches", matchDetails.id, "messages"),
					orderBy("timestamp", "desc")
				),
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[matchDetails, db]
	);

	//creates a new "messages" collection nested under matches>matchdetails.id>messages. contains the data below
	const sendMessage = () => {
		addDoc(collection(db, "matches", matchDetails.id, "messages"), {
			timestamp: serverTimestamp(),
			userId: user.uid,
			displayName: user.displayName,
			photoURL: matchDetails.users[user.uid].photoURL,
			message: input,
		});

		setInput("");
	};

	return (
		<SafeAreaView style={tailwind("flex-1")}>
			<Header
				title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
				callEnabled={true}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"} //configure screen correctly on different device OS
				style={tailwind("flex-1")}
				keyboardVerticalOffset={10}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss} //when touched, hides the keyboard so the chat messages can be viewed
				>
					<FlatList
						inverted={-1} //make the chat come from top down
						style={tailwind("pl-4")}
						data={messages}
						keyExtractor={(item) => item.id}
						renderItem={
							({ item: message }) =>
								message.userId === user.uid ? (
									<SenderMessage key={item.id} message={message} />
								) : (
									<ReceiverMessage key={item.id} message={message} />
								) //use the user ID to render a different message component
						}
					/>
				</TouchableWithoutFeedback>

				<View
					style={tailwind(
						"flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
					)}
				>
					<TextInput
						style={tailwind("h-10")}
						placeholder="Send Message..."
						onChangeText={setInput}
						onSubmitEditing={sendMessage} //makes cellphone return send message as well as button below
						value={input}
					/>
					<Button onPress={sendMessage} title="Send" color="#FF5864" />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default MessageScreen;
