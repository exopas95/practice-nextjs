import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    return (
        <nav>
            <Link
                href="/"
                className={router.pathname === "/about" ? "active" : ""}
            >
                Home
            </Link>
            <Link
                href="/about"
                className={router.pathname === "/about" ? "active" : ""}
            >
                About
            </Link>

            <style jsx>{`
                nav {
                    background-color: tomato;
                }
                a {
                    text-decoration: none;
                }
                .active {
                    color: yellow;
                }
            `}</style>
        </nav>
    );
}