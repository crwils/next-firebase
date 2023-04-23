import { doc, onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore} from "./firebase";

export const useUserData = () => {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
  
  
    useEffect(() => {
      let unsubscribe;
  
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const data = doc.data();
          console.log({data})
        setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
  
      return unsubscribe;
  
    }, [user, username]);

    return { user, username}
}