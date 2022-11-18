import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hamburger from "../hamburger/hamburger";
import { Toggle } from "../toggle button/toggle";
import Modal from "../UI/modal/modal";


const Navbar = ({ logOutHandler }) => {

    const [dark, setDark] = useState(false)
    const [show, setShow] = useState(false)

    const labelRef = useRef()
    const spanRef = useRef()

    //* Handling onclick 
    const labelOnclickHandler = e => {
        e.preventDefault()
        const spanDom = spanRef.current
        const labelDom = labelRef.current
        spanDom.classList.toggle("toggle-span-after")
        labelDom.classList.toggle("toggle-label-after")

        if (dark) {
            setDark(false)
            localStorage.setItem("Theme", "Light")
        }
        else if (!dark) {
            setDark(true)
            localStorage.setItem("Theme", "Dark")
        }
        document.body.classList.toggle("dark")
    }


    useEffect(() => {
        const labelDom = labelRef.current;
        const spanDom = spanRef.current;

        var theme = localStorage.getItem("Theme")

        if (theme === "Light") {
            setDark(false)
            spanDom.classList.remove("toggle-label-after")
            labelDom.classList.remove("toggle-span-after")
            document.body.classList.remove("dark")
        }
        else if (theme === "Dark") {
            setDark(true)
            spanDom.classList.add("toggle-span-after")
            labelDom.classList.add("toggle-label-after")
            document.body.classList.add("dark")
        }

    }, [])

    //* closing Modal
    const modalCloseHandler = () => {
        setShow(false)
        document.body.classList.remove("overflow-hidden")
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
            document.body.classList.remove("overflow-hidden")
        }
        else {
            setShow(true)
            document.body.classList.add("overflow-hidden")
        }
    }

    return (
        <>
            <Modal modalClose={modalCloseHandler} show={show} />
            <nav className="navbar nav-res">
                <Toggle
                    labelOnclick={labelOnclickHandler}
                    value={dark}
                    refLabel={labelRef}
                    refSpan={spanRef}
                />
                <Hamburger pElement={pElement} hamHandler={hamHandler} />
                <h2 className="welcome-message">Welcome admin</h2>
                <ul className="nav-ul">
                    <li>
                        <Link href="/">
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
        </>

    )
}

export default Navbar;