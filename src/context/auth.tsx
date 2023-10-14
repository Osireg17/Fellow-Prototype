import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import {
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

import { auth } from "@/config/firebase";

interface AuthContextType {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  resetPassword: (email: string) => void;
  authInitialised: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  resetPassword: () => {},
  authInitialised: false,
  user: null,
});

// This hook can be used to access the user info.
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setAuth] = useState<User | null>(null);
  const router = useRouter();

  const [authInitialised, setAuthInitialised] = React.useState<boolean>(false);

  const useProtectedRoute = (user: User | null) => {
    const segments = useSegments();
    const router = useRouter();

    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    React.useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    React.useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialised) return;

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/sign-in");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.push("/");
      }
    }, [user, segments, authInitialised, isNavigationReady]);
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuth(user);
      setAuthInitialised(true);
    });

    return unsubscribe;
  }, []);

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/");
      })
      .catch((err) => Alert.alert("Login error", err.message));
    // router.replace("/profile");
  };

  const signOut = async () => {
    setAuth(null);
    // Clear the flag from AsyncStorage
    await AsyncStorage.removeItem("isLoggedIn");
    router.replace("/sign-in");
  };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        resetPassword,
        authInitialised,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
