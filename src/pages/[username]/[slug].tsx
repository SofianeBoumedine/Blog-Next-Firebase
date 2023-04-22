import styles from '../../styles/Post.module.css';
import { firestore, getUserWithUsername, postToJSON } from "@/lib/firebase";
import PostContent from '@/components/PostContent';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {useContext} from 'react';
import { UserContext } from '@/lib/context';

export async function getStaticProps({ params }) {
  const {username, slug} = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  console.log("kde",slug);
  if(userDoc){
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;
    console.log(post)
  };

  return{
    props: {post, path},
    revalidate: 100,
  }
}

export async function getStaticPaths(){

  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const {slug, username} = doc.data();
    return {
      params: {username, slug},
    };
  });
  console.log("test3",paths)
  return {
    paths,
    fallback: 'blocking'
  };
}

export default function Post(props) {
  console.log("test1",props);
  const postRef = firestore.doc(props.path);
  console.log("test2",postRef);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  const {user: currentUser} = useContext(UserContext);
  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post}></PostContent>
      </section>

      <aside className='card'>
        <p>
          <strong>{post.heartCount || 0} </strong>
        </p>
      </aside>
    </main>
  )
}
