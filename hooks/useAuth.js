import {
	getAuth,
	getRedirectResult,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signInWithRedirect,
	signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		// signInWithPopup(auth, provider);
		signInWithRedirect(auth, provider);
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
