import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
	Button,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../hooks/useAuth";

const DUMMY_DATA = [
	{
		id: 0,
		firstName: "Brad",
		lastName: "Pitt",
		job: "Actor",
		photoURL:
			"https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY3MDUxMjkzMjI1OTIwMTcz/brad-pitt-attends-the-premiere-of-20th-century-foxs--square.jpg",
		age: 58,
	},
	{
		id: 1,
		firstName: "Megan",
		lastName: "Fox",
		job: "Actor",
		photoURL:
			"https://media.glamour.com/photos/626ac4239bffe69d175b7e0a/master/w_2560%2Cc_limit/1324443084",
		age: 36,
	},
	{
		id: 2,
		firstName: "Oliva",
		lastName: "Wilde",
		job: "Actor",
		photoURL:
			"https://hips.hearstapps.com/hmg-prod/images/gettyimages-1662647826.jpg?crop=1.00xw:0.669xh;0,0.128xh&resize=640:*",
		age: 38,
	},
];

const HomeScreen = () => {
	const navigation = useNavigation();
	const { user, logOut } = useAuth();
	const tailwind = useTailwind();
	const swipeRef = useRef(null);

	const [profiles, setProfiles] = useState([]);

	return (
		<SafeAreaView style={tailwind("flex-1")}>
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
				<TouchableOpacity
					onPress={() => navigation.navigate("Modal")}
					style={tailwind("")}
				>
					<Image
						style={tailwind("h-[56px] w-[47px]")}
						source={require("../TinderLogo.png")}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("Chat")}
					style={tailwind("")}
				>
					<Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
				</TouchableOpacity>
			</View>
			{/* end of header */}

			<View style={tailwind("flex-1 -mt-6")}>
				<Swiper
					ref={swipeRef}
					containerStyle={{ backgroundColor: "transparent" }}
					cards={DUMMY_DATA}
					stackSize={5}
					cardIndex={0}
					backgroundColor={"4FD0E9"}
					animateCardOpacity
					verticalSwipe={false}
					onSwipedLeft={() => {
						console.log("Swipe Pass");
					}}
					onSwipedRight={() => {
						console.log("Swipe Match");
					}}
					overlayLabels={{
						left: {
							title: "NOPE",
							style: {
								label: {
									textAlign: "right",
									color: "red",
								},
							},
						},
						right: {
							title: "MATCH",
							style: {
								label: {
									color: "#4DED30",
								},
							},
						},
					}}
					renderCard={(card) =>
						card ? (
							<View
								id={card.id}
								style={tailwind("relative h-3/4 bg-white rounded-xl")}
							>
								<Image
									style={tailwind("absolute top-0 h-full w-full rounded-xl")}
									source={card.photoURL}
								/>
								<View
									style={[
										tailwind(
											"absolute bottom-0 h-full bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"
										),
										styles.cardShadow,
									]}
								>
									<View>
										<Text style={tailwind("text-xl font-bold")}>
											{card.firstName} {card.lastName}
										</Text>
										<Text> {card.job} </Text>
									</View>
									<Text style={tailwind("text-2xl font-bold ")}>
										{" "}
										{card.age}{" "}
									</Text>
								</View>
							</View>
						) : (
							<View
								style={[
									tailwind(
										"relative bg-white h-3/4 rounded-xl justify-center items-center"
									),
									styles.cardShadow,
								]}
							>
								<Text style={tailwind("font-bold pb-5")}>No more profiles</Text>
								<Image
									style={tailwind("h-20 w-full")}
									height={100}
									width={100}
									source={{
										uri: "https://t3.ftcdn.net/jpg/03/23/92/38/360_F_323923845_sB6dVDxEFFJOqJB6Rn6kCyf3tBe1RRaA.jpg",
									}}
								/>
							</View>
						)
					}
				/>
			</View>
			<View style={tailwind("flex flex-row justify-evenly")}>
				<TouchableOpacity
					onPress={() => swipeRef.current.swipeLeft()}
					style={tailwind(
						"items-center justify-center rounded-full w-16 h-16 bg-red-200 mb-4"
					)}
				>
					<Entypo name="cross" size={24} color="red" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => swipeRef.current.swipeRight()}
					style={tailwind(
						"items-center justify-center rounded-full w-16 h-16 bg-green-200 mb-4"
					)}
				>
					<AntDesign name="heart" size={24} color="green" />
				</TouchableOpacity>
			</View>

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
