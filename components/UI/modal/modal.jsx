import Backdrop from "../backdrop/backdrop";
import Link from "next/link";
import { useRouter } from "next/router";
const Modal = ({ show, modalClose }) => {

    const router = useRouter()

    const logOutHandler = () => {
        const token = localStorage.getItem("Token")

        if (token) {
            localStorage.removeItem("Token")
            router.push("/")
        }
        if (token && router.asPath === "/") {
            localStorage.removeItem("Token")
            document.location.reload()
        }

    }


    const handleOverflow = () => {
        document.body.classList.remove("overflow-hidden")
    }
    return (
        <>
            <Backdrop click={modalClose} show={show} />
            <div
                className="modal"
                style={{
                    transform: show ? "translateX(0)" : "translateX(-100vw)",
                    opacity: show ? "1" : "0"
                }}
            >
                <h3 className="wlc-msg">
                    welcome admin
                </h3>
                <ul className="nav-ul">
                    <li>
                        <Link href="/">
                            <a className="link" onClick={handleOverflow}>
                                Home
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/informations">
                            <a className="link" onClick={handleOverflow}>
                                Informations
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a className="link" onClick={logOutHandler}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Modal