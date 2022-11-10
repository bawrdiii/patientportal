import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hamburger from "../hamburger/hamburger";
import { Toggle } from "../toggle button/toggle";
import Modal from "../UI/modal/modal";


const Navbar = ({ logOutHandler }) => {

    const [light, setLight] = useState(true)
    const [show, setShow] = useState(false)

    const labelRef = useRef()
    const spanRef = useRef()

    //* Handling onclick 
    const labelOnclickHandler = e => {
        e.preventDefault()
        const labelDom = labelRef.current;
        const spanDom = spanRef.current;

        labelDom.classList.toggle("toggle-label-after")
        spanDom.classList.toggle("toggle-span-after")

        if (light) {
            setLight(false)
            document.body.classList.remove("dark")
            localStorage.setItem("Theme", "Light")
        }
        else if (!light) {
            document.body.classList.add("dark")
            setLight(true)
            localStorage.setItem("Theme", "Dark")
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

    //* closing Modal
    const modalCloseHandler = () => {
        setShow(false)
        document.body.removeAttribute("class")
        const pDom = pElement.current

        pDom.classList.remove("ham-after")

    }

    //* Hamburger handler & making show true 
    const pElement = useRef()

    const hamHandler = () => {
        const pDom = pElement.current

        if (pDom.classList.contains("ham-after")) {
            pDom.classList.remove("ham-after")
        } else {
            pDom.classList.add("ham-after")
        }
        if (show) {
            setShow(false)
            document.body.removeAttribute("class")
        }
        else {
            setShow(true)
            document.body.classList.add("overflow-hidden")
        }
    }

    return (
        <>
            <Modal modalClose={modalCloseHandler} show={show} />
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
                        <Link href="/informations">
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
            </nav>
            <nav className="nav-res">
                <Hamburger pElement={pElement} hamHandler={hamHandler} />
                <Toggle
                    labelOnclick={labelOnclickHandler}
                    value={light}
                    refLabel={labelRef}
                    refSpan={spanRef}
                />
            </nav>
        </>

    )
}

export default Navbar;