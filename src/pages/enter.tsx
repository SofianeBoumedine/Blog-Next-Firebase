import { auth, googleAuthProvider, Otherauth, firestore } from "@/lib/firebase";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/context";
import debounce from 'lodash.debounce';


export default function EnterPage({ }) {
    // const user = null;
    // const username = null;
    const {user, username} = useContext(UserContext)

    // 1. user signed out <SignInButton />
    // 2. user signed in, but missing username <UsernameForm />
    // 3. user signed in, has username <SignOutButton />
  return (
    <main>
        <h1>S&apos;inscrire</h1>
        {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
    const signInWithGoogle = async () => {
        await Otherauth.signInWithPopup(googleAuthProvider);
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <Image alt="AvatarProfilePicture" src={'/google.png'} width="80" height="60"/>Connexion avec Google
        </button>
    );
}

// Sign out button
function SignOutButton() {
    return <button onClick={()=> auth.signOut()}>Déconnexion</button>
}

// Username form
function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user, username} = useContext(UserContext);


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formValue);
        // @ts-ignore: Object is possibly 'null'.
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);
        
        const batch = firestore.batch();
        // @ts-ignore: Object is possibly 'null'.
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName});
        // @ts-ignore: Object is possibly 'null'.
        batch.set(usernameDoc, {uid: user.uid});

        await batch.commit();
    }

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length<3){
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
        if(re.test(val)){
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // useEffect(()=>{
    //     checkUsername(formValue);
    // }, [formValue]);

    const checkUsername = useCallback(
        debounce(async (username) => {
            if(username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const {exists} = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        !username && (
            <section>
                <h3>Choisir votre nom d&apos;utilisateur</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="Mon nom d'utilisateur" value={formValue} onChange={onChange}/>
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choisir
                    </button>

                    <h3>Debug status</h3>
                    <div>
                        Nom d&apos;utilisateur: {formValue}
                        <br />
                        Chargement: {loading.toString()}
                        <br />
                        Nom d&apos;utilisateur Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    )
}

function UsernameMessage({username, isValid, loading}) {
    if(loading) {
        return <p>Vérification de la disponibilité du nom d&apos;utilisateur</p>;
    } else if (isValid) {
        return <p className="text-success">{username} est disponible !</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">Ce nom d&apos;utilisateur n&apos;est pas disponible</p>;
    } else {
        return <p></p>;
    }
}