import { auth, firestore, increment } from "@/lib/firebase";
import { getDocs } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

export default function Heart({ postRef }) {
    const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);
    console.log("tesss2",heartDoc?.exists())

    const addHeart = async() => {
        const uid = auth?.currentUser?.uid;
        const batch = firestore.batch();

        batch.update(postRef, {heartCount: increment(1)});
        batch.set(heartRef, {uid});
        await batch.commit();
    };

    const removeHeart = async() => {
        const batch = firestore.batch();
        batch.update(postRef, {heartCount: increment(-1)});
        batch.delete(heartRef);

        await batch.commit();
    }
  
  return (
    !heartDoc?.exists() ? ( <button onClick={addHeart}>💗 Heart</button>) : (<button onClick={removeHeart}>💔 Unheart</button> )
  )
}