import { UserContext } from "@/lib/context";
import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useContext, useEffect, useCallback } from "react";

const UsernameForm = () => {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    useEffect(() => {
        checkUsername(formValue)
    }, [formValue])

    const onSubmit = async (e) => {
        e.preventDefault();

        const userDoc = doc(firestore, `users/${user.uid}`);
        const usernameDoc = doc(firestore, `usernames/${formValue}`);
        console.log({userDoc, usernameDoc});

    }

    const checkUsername = useCallback(
        async (username) => {
            if (username.length >= 3) {
                const ref = doc(firestore, `usernames/${username}`);
                const exists = await getDoc(ref);
                if (exists.exists()) console.log("Data exists!") 
                console.log('Firestore read executed!');
                
                setIsValid(exists);
                setLoading(false);
            }
        }
    )

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form >

                    <input name="username" placeholder={formValue} onChange={onChange} />

                    <button type="submit" className="btn-green" disabled={isValid}>
                        Choose
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>

                </form>
            </section>
        )
    )
}

export default UsernameForm;