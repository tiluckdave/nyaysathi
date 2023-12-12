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
import { createUser } from "@/lib/db";
import { useRouter } from "next/router";



const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const router = useRouter();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      createUser(result.user);
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

  const signInWithBiometric = (user) => {
    setUser(user);
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
  }, [ user ]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, sendSignInLink, signInWithEmail, twitterSignIn, signInWithBiometric }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};