import {
	getAuth,
	getRedirectResult,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signInWithRedirect,
	signOut,
} from "firebase/auth";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [initialLoading, setinitialLoading] = useState(true);
	const [loading, setLoading] = useState(false);

	const googleSignIn = () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		// signInWithPopup(auth, provider);
		signInWithRedirect(auth, provider);
		setLoading(false);
	};

	const logOut = () => {
		setLoading(true);
		signOut(auth);
		setLoading(false);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setinitialLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const memoedValue = useMemo(
		() => ({
			googleSignIn,
			logOut,
			user,
			initialLoading,
			loading,
		}),
		[user]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
