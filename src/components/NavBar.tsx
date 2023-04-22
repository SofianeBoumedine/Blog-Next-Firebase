import { UserContext } from '@/lib/context';
import Link from 'next/link';
import { useContext } from 'react';
import Image from "next/image";
import { auth } from '@/lib/firebase';


export default function Navbar(){
    // const user = true;
    // const username = true;
    // const {user, username} = { };
    const {user, username} = useContext(UserContext);
    console.log(username);

    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">Feed</button>
                    </Link>
                </li>
                
                {username && (
                    <>
                    <li className="push-left">
                        {username && (
                            <button onClick={()=> auth.signOut()}>Déconnexion</button>
                        )}
                    </li>
                    <li className="push-left">
                        <Link href="/admin">
                            <button className="btn-blue">Crée un article</button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}>
                            {/* <img src={user?.photoURL} /> */}
                            <Image alt="AvatarProfilePicture" src={user?.photoURL} width="80" height="60"/>
                        </Link>
                    </li>
                    </>
                )}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button>Connexion</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}