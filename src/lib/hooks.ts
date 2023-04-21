import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    console.log("test", user)
    useEffect(()=> {
        let unsubscribe;

        if(user) {
            console.log(1);
            const ref = firestore.collection('users').doc(user.uid);
            unsubscribe = ref.onSnapshot((doc)=> {
                setUsername(doc.data()?.username);
            });
        } else {
            setUsername(null);
        }
        return unsubscribe;
    }, [user]);

    return { user, username };
}