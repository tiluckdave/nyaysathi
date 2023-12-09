import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/db";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
  
    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        createUser(result.user);
      });
      router.push("/");
    };

    const logOut = () => {
        signOut(auth);
        router.push("/login");
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      }, [user]);
    
      return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
          {children}
        </AuthContext.Provider>
      );
    };
    
    export const UserAuth = () => {
      return useContext(AuthContext);
    };