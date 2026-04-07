import { firebaseAuth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type User, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";

type AuthContextData = {
    user: User | null;
    login: typeof login;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
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

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    login,
    signUp,
    logOut,
    googleSignIn
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
        googleSignIn
    }

    const useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
            if (user) setUser(user);
            return () => {
                unsubscribe();
            }
        })
    });
    
    return <userAuthContext.Provider value={}>{children}</userAuthContext.Provider>
}

export const userUserAuth = () => {
    return useContext(userAuthContext);
}