import { firebaseAuth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type User, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, GithubAuthProvider } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextData = {
    user: User | null;
    login: typeof login;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
    githubSignIn: typeof githubSignIn;
}

const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

const logOut = () => {
    signOut(firebaseAuth);
}

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, googleAuthProvider);
}

const githubSignIn = () => {
    const githubAuthProvider = new GithubAuthProvider();
    return signInWithPopup(firebaseAuth, githubAuthProvider);
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    login,
    signUp,
    logOut,
    googleSignIn,
    githubSignIn
});

interface IUserAuthProvider {
    children: React.ReactNode
}

export const UserAuthProvider: React.FunctionComponent<IUserAuthProvider> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    const value: AuthContextData = {
        user,
        login,
        signUp,
        logOut,
        googleSignIn,
        githubSignIn
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
            if (user) setUser(user);
            return () => {
                unsubscribe();
            }
        })
    });
    
    return <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}