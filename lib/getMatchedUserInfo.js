//manipulating datastructures > going from an object with 2 object users in it to a single object with just the matched user data
// filter out the user's own info from the matched collection in DB (it's a object of both user objects matched together)
const getMatchedUserInfo = (users, userLoggedIn) => {
	//immutable pattern, create a copy of original users
	const newUsers = { ...users };
	//delete the currently logged in user object from the matches object(object with 2 user objects in it)
	delete newUsers[userLoggedIn];

	//turns the object with only 1 user object in it, into an array with an user ID and user object in it.
	//Object.entries(newUsers) gets the key>value pairs then flat turns the {object>{object}} into [id, {user}]
	const [id, user] = Object.entries(newUsers).flat();

	//rather than embedded user, spread the user
	return { id, ...user };
};

export default getMatchedUserInfo;
