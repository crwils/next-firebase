import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";


export const useUserData = () => {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
  
  
    useEffect(() => {
      let unsubscribe;
      console.log({username})
  
      if (user) {
        const ref = doc(firestore, "users", user.uid);
          unsubscribe = onSnapshot(ref, (doc) => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
  
      return unsubscribe;
  
    }, [user, username]);

    return { user, username}
}