import { UserContext } from "@/lib/context";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
    const { user, username } = useContext(UserContext)

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>

                {username && (
                    <>
                        <li className="push-left">
                            <Link href="/admin">
                                <button>Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={"/display-pic.jpg"} />
                            </Link>
                        </li>
                    </>
                )}

                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}

            </ul>
        </nav>
    )
}