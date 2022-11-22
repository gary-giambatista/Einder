import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

const ChatScreen = () => {
	const navigation = useNavigation();
	const tailwind = useTailwind();

	return (
		<SafeAreaView>
			<Header title="Chat" callEnabled={true} />
			<ChatList />
			<Text>I am the Chatscreen.</Text>
		</SafeAreaView>
	);
};

export default ChatScreen;
