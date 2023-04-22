import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { firestore, fromMillis, postToJSON } from '@/lib/firebase'
import PostFeed from '@/components/PostFeed'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


const LIMIT = 10;

export async function getServerSideProps(context) {
  console.log("TEST33", context);
  const postsQuery = firestore
  .collectionGroup('posts')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    // props: (JSON.parse(JSON.stringify(posts))),
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if(newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && <button onClick={getMorePosts}>Charger plus d&apos;articles</button>}
      <Loader show={loading} />
      {postsEnd && 'Vous avez atteint la fin des posts!'}
      {/* <div>
        <Loader show />
        <Link prefetch={false} href={{
          pathname: '/[username]',
          query: { username: 'jeffd23' },
        }}>
          Jeff&apos;s Profile
        </Link>
        <button onClick={()=> toast.success('hello toast')}>
          Toast Me
        </button>
      </div> */}
    </main>
  )
}
