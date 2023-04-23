import { UserContext } from "@/lib/context";
import { googleAuthProvider, auth } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useCallback, useContext, useState, useEffect } from "react";
import UsernameForm from "@/components/UsernameForm";

const EnterPage = () => {
    const { user, username } = useContext(UserContext);

    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

export default EnterPage;

const SignInButton = () => {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider)
            .then((user) => {
                console.log({user});
            })
            .catch((error) => {
                console.error(error);
            })
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={"/google.png"} /> Sign in with Google
        </button>
    )
}

const SignOutButton = () => {
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}