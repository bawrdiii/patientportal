import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Toggle } from "../toggle button/toggle";


const Navbar = ({ logOutHandler }) => {

    const [light, setLight] = useState(true)

    const labelRef = useRef()
    const spanRef = useRef()

    const labelOnclickHandler = e => {
        e.preventDefault()
        const labelDom = labelRef.current;
        const spanDom = spanRef.current;

        labelDom.classList.toggle("toggle-label-after")
        spanDom.classList.toggle("toggle-span-after")

        if (light) {
            setLight(false)
            localStorage.setItem("Theme", "Dark")
        }
        else if (!light) {
            setLight(true)
            localStorage.setItem("Theme", "Light")
        }

    }
    useEffect(() => {
        const labelDom = labelRef.current;
        const spanDom = spanRef.current;

        var theme = localStorage.getItem("Theme")

        if (theme === "Light") {
            spanDom.classList.remove("toggle-label-after")
            labelDom.classList.remove("toggle-span-after")
        }
        else if (theme === "Dark") {
            spanDom.classList.add("toggle-span-after")
            labelDom.classList.add("toggle-label-after")

        }

    })

    return (
        <nav className="navbar">
            <Toggle labelOnclick={labelOnclickHandler} value={light}
                refLabel={labelRef} refSpan={spanRef}
            />
            <h2 className="welcome-message">Welcome admin</h2>
            <ul className="nav-ul">
                <li>
                    <Link href='/'>
                        <a className="link">
                            Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='informations'>
                        <a className="link">
                            Informations
                        </a>
                    </Link>
                </li>
                <li>
                    <a className="link"
                        onClick={logOutHandler}
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </nav >
    )
}

export default Navbar;