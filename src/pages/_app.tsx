import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GetServerSideProps } from 'next'
import Navbar from '@/components/NavBar';
import { UserContext } from '@/lib/context';
import useUserData from '@/lib/hooks';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  // const [user] = useAuthState(auth);
  // const [username, setUsername] = useState(null);

  // useEffect(()=> {
  //   let unsubscribe;
  //   if (user) {
  //     const ref = firestore.collection('users').doc(user.uid);
  //     unsubscribe = ref.onSnapshot((doc)=>{
  //       setUsername(doc.data()?.username);
  //     })
  //   } else {
  //     setUsername(null);
  //   }

  // }, [user]);
  
  return (
    <>
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
    </>
  );
}