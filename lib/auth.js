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

  const redirectUser = (role) => {
    if (role === "lawyer") router.push("/lawyer/dashboard");
    else if (role === "admin") router.push("/admin");
    else router.push("/dashboard");
  }

  const googleSignIn = (role) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      setUser({...result.user, role: role});
      createUser({...result.user, role: role});
      redirectUser(role);
    }).catch((error) => {
      console.log(error);
    });
  };

  const twitterSignIn = (role) => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      setUser({...result.user, role: role});
      createUser({...result.user, role: role});
      redirectUser(role);
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

  const signInWithEmail = (role) => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem("email");
      if (!email) {
        console.log("This device not allowed to sign in");
      }
      signInWithEmailLink(auth, email, window.location.href).then((result) => {
        localStorage.removeItem("email");
        setUser({...result.user, role: role});
        createUser({...result.user, role: role});
        redirectUser(role);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const logOut = () => {
    signOut(auth);
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [ user ]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, sendSignInLink, signInWithEmail, twitterSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};