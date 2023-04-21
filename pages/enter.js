import { UserContext } from "@/lib/context";
import { googleAuthProvider, auth } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";

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
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={"/google.png"}/> Sign in with Google
        </button>
    )
}

const SignOutButton = () => {
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

const UsernameForm = () => {
    return <p>Username Form</p>
}