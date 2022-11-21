import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { isReactNative } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import {
	collection,
	deleteDoc,
	doc,
	DocumentSnapshot,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import generateId from "../lib/GenerateId";

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
	//hooks
	const navigation = useNavigation();
	const { user, logOut } = useAuth();
	const tailwind = useTailwind();
	const swipeRef = useRef(null);

	//state
	const [profiles, setProfiles] = useState([]);

	//force open modal if no info is entered (user needs to have info in their profile to swipe)
	useLayoutEffect(() => {
		const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
			if (!snapshot.exists()) {
				navigation.navigate("Modal");
			}
		});
		return unsub();
	}, []);

	//fetch users cards correctly (filter passed/swiped/own user profile)
	useEffect(() => {
		let unsub;

		const fetchCards = async () => {
			//get passes to use in filtering cards (so you don't see cards already passed on)
			const passes = await getDocs(
				collection(db, "users", user.uid, "passes")
			).then((snapshot) => snapshot.docs.map((doc) => doc.id));
			//get swipes to use in filtering cards (so you don't see cards already swiped yes on)
			const swipes = await getDocs(
				collection(db, "users", user.uid, "swipes")
			).then((snapshot) => snapshot.docs.map((doc) => doc.id));

			//store the arrays if there is one
			const passedUserIds = passes.length > 0 ? passes : ["test"];
			const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

			unsub = onSnapshot(
				//use query fireBase method to only filter and map out cards you want. Query removes passed & swiped on cards, while filter removes the current users own profile.
				query(
					collection(db, "users"),
					where("id", "not-in", [...passedUserIds, ...swipedUserIds])
				),
				(snapshot) => {
					setProfiles(
						snapshot.docs
							.filter((doc) => doc.id !== user.uid)
							.map((doc) => ({
								id: doc.id,
								...doc.data(),
							}))
					);
				}
			);
		};
		fetchCards();
		return unsub;
	}, [db]);

	//create swipped left(rejected db collection) by passing cardIndex which is attached to each user's ID
	const swipeLeftRecord = (cardIndex) => {
		if (!profiles[cardIndex]) return;

		// get all relevant user data
		const userSwiped = profiles[cardIndex];
		console.log(`You swiped PASS on ${userSwiped.displayName}`);

		setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
	};
	//create swiped on db record by passing cardIndex which is attached to each user's ID, also handle MATCHING
	const swipeRightRecord = async (cardIndex) => {
		if (!profiles[cardIndex]) return;

		// get all relevant user data
		const userSwiped = profiles[cardIndex];
		const loggedInProfile = await (await getDocs(db, "users", user.uid)).data();

		//check if the user swipped on you
		getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
			(documentSnapshot) => {
				if (documentSnapshot.exists()) {
					//user has swiped with you before you matched
					//create a match!
					console.log(`Horray, you matched with ${userSwiped.displayName}`);
					//record the swip
					setDoc(
						doc(db, "users", user.uid, "swipes", userSwiped.id),
						userSwiped
					);
					//create the MATCH here (create a separate collection in db & match the 2 user Ids)
					//create a function that always makes 1 user ID go before the other (lib/generateId.js)
					setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
						users: {
							[user.uid]: loggedInProfile,
							[userSwiped.id]: userSwiped, //used to check who each user is (tell which user is which)
						},
						usersMatched: [user.uid, userSwiped.id], //used for string comparison check later on
						timestamp: serverTimestamp(),
					});

					navigation.navigate("Match", {
						//useRoute params from react-navigation/native (passes props to the route)
						loggedInProfile,
						userSwiped,
					});
				} else {
					//user has swiped Yes as the first interaction between the two or didn't get swiped on
				}
			}
		);

		console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`);
		setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
	};

	//Main Component rendering
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
					onSwipedLeft={(cardIndex) => {
						swipeLeftRecord(cardIndex);
						console.log("Swipe Pass");
					}}
					onSwipedRight={(cardIndex) => {
						swipeRightRecord(cardIndex);
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
								<Text style={tailwind("font-bold pb-3")}>No more profiles</Text>
								<Image
									style={tailwind("h-52 w-full")}
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
