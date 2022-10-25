import { useRef, useState } from "react"
import MainAuth from "../components/mainpage/mainAuthentication"
import Navbar from "../components/Navbar/navbar"



const MainIndex = () => {
    //? define administrator
    const [admin, setAdmin] = useState(false)

    //? ref to elements
    const headingRef = useRef()
    const userInp = useRef()
    const passInp = useRef()


    //* Checking value
    const btnOnclickHandler = e => {
        e.preventDefault()
        const headingDom = headingRef.current;
        const userInpDom = userInp.current;
        const PassInpDom = passInp.current;

        const formData = new FormData(e.target)

        const inpObj = Object.fromEntries(formData)

        const username = formData.get("Username")
        const password = formData.get("Password")

        if (username.toLowerCase() === "admin" && password.trim() === "admin") {
            headingDom.classList.add("welcome")
            setTimeout(() => {
                setAdmin(true)
                headingDom.classList.remove("welcome")
            }, 2000);
        }
        if (username.toLowerCase() !== "admin") {
            setError(userInpDom, "salar")
        }

    }

    const setError = (input, message) => {
        if (input) {
            const formControl = input.parentElement;
            const small = formControl.querySelector("small")
            console.log(small, formControl);


            formControl.classList.add("form-error")
            formControl.classList.remove("form-success");
        }

    };
    const setSuccess = (input) => {
        const forInput = input.parentElement;
        forInput.classList.remove("form-error");
        forInput.classList.add("form-success");
    };

    return (
        <>
            {!admin ?
                <MainAuth
                    headingRef={headingRef}
                    submitForm={btnOnclickHandler}
                    passInputRef={passInp}
                    userInputRef={userInp}
                />
                :
                (
                    <>
                        <Navbar />
                    </>
                )

            }
        </>
    )
}
export default MainIndex