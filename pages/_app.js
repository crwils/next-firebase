import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import { UserContext } from "../lib/context";
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { firestore, auth } from '@/lib/firebase';
import { doc, onSnapshot } from "firebase/firestore";


export default function App({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);


  useEffect(() => {
    let unsubscribe;
    console.log({user})

    if (user) {
      const ref = doc(firestore, "users", user.uid);
        unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;

  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  )
}
