import { Toggle } from "../../toggle button/toggle";
import Backdrop from "../backdrop/backdrop";
import Link from "next/link";
import { useRouter } from "next/router";
const Modal = ({ show, modalClose }) => {

    const router = useRouter()

    const logOutHandler = () => {

        const token = localStorage.getItem("Token")

        if (token) {
            localStorage.removeItem(token)
            router.push("/")
        }
        else router.push("/")
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