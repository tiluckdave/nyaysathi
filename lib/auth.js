import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createCenter, createUser } from "@/lib/db";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
  
    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        createUser(result.user);
        // createCenter({
        //   "uid": "1",
        //   "title" : "Amity Legal Aid Cell",
        //   "address" : "Maharshi Nagar Near Datta Mandir",
        //   "phone" : "123456789".
        //   "state" : "Maharashtra",
        //   "city" : "Pune",
        //   "locationURL" : "https://www.google.com/maps/place/ILS+Law+College/@18.5171271,73.8254709,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bf9ac57f49eb:0xc6624739e732732!8m2!3d18.5171271!4d73.8280512!16s%2Fm%2F026jtd3?authuser=0&entry=ttu" 
        // })
      });
    
    };

    const twitterSignIn = () => {
      const provider = new TwitterAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        createUser(result.user);
      });
      
    };

    const sendSignInLink = (email) => {
      sendSignInLinkToEmail(auth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      }).then(() => {
        localStorage.setItem("email", email);
      }).catch((error) => {
        console.log(error);
      });
    }

    const signInWithEmail = () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("email");
        if (!email) {
          console.log("This device not allowed to sign in");
        }
        signInWithEmailLink(auth, email, window.location.href).then((result) => {
          localStorage.removeItem("email");
          createUser(result.user);
        }).catch((error) => {
          console.log(error);
        });
      }
    }

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
        <AuthContext.Provider value={{ user, googleSignIn, logOut, sendSignInLink, signInWithEmail, twitterSignIn }}>
          {children}
        </AuthContext.Provider>
      );
    };
    
    export const UserAuth = () => {
      return useContext(AuthContext);
    };