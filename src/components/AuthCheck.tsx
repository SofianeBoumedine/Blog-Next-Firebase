import { UserContext } from "@/lib/context";
import Link from "next/link";
import { useContext } from "react";

export default function AuthCheck(props) {
    const {username} = useContext(UserContext);
    return username ? props.children : props.fallback || <Link href="/enter">Vous devez être connecté en tant qu'Admin</Link>
}