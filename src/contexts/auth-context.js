import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import useGetDataWithId from "hooks/useGetDataWithId";
import { queries } from "@testing-library/react";

const AuthContext = createContext();

function AuthProvider({ children, ...props }) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (userCurrent) => {
      // const queries = query(collection(db, "users", ));
      if (userCurrent?.uid) {
        try {
          onSnapshot(doc(db, "users", userCurrent?.uid), (snapShot) => {
            const user = snapShot?.id
              ? {
                  id: snapShot.id,
                  ...snapShot.data(),
                }
              : {};
            setUserInfo(user);
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        setUserInfo({});
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider.");
  return context;
}

export { useAuth, AuthProvider };
