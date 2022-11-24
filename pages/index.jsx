import { useEffect, useRef, useState } from "react"
import PatientContainer from "../components/add patient/patientContainer"
import MainAuth from "../components/mainpage/mainAuthentication"
import Navbar from "../components/navbar/navbar"
import { Toggle } from "../components/toggle button/toggle"
import Head from "next/head"
import Img from "../assets/Images/check.jpg"
import { BarLoader } from "react-spinner-animated"

const MainIndex = () => {
    //? define administrator
    const [admin, setAdmin] = useState(false)
    const [dark, setDark] = useState(false)
    const [show, setShow] = useState(false)

    //? ref to elements
    const headingRef = useRef()
    const userInp = useRef()
    const passInp = useRef()
    const spanRef = useRef()
    const labelRef = useRef()
    // * UseEffect 
    useEffect(() => {
        var token = localStorage.getItem("Token")
        const labelDom = document.querySelector(".toggle-label")
        const spanDom = document.querySelector(".toggle-span")
        var theme = localStorage.getItem("Theme")
        if (token) {
            setAdmin(true)
        }
        else {
            setAdmin(false)
        }
        if (spanDom && labelDom) {
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
            if (window.matchMedia("(prefers-color-scheme: dark)").matches && !theme) {
                setDark(true)
                spanDom.classList.add("toggle-span-after")
                labelDom.classList.add("toggle-label-after")
                document.body.classList.add("dark")
                localStorage.setItem("Theme", "Dark")
            }
        }
    }, [])


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
            setShow(true)
            var token = tokenGenerator()
            localStorage.setItem("Token", `Bearer ${token}`)
            setTimeout(() => {
                setShow(false)
                setAdmin(true)
            }, 700);
        }
        if (username.toLowerCase() !== "admin" && username !== "") {
            setError(userInpDom, `Username doesn't exist, sorry!`)
        } else if (username.toLowerCase() === "admin") {
            setSuccess(userInpDom)
        }

        if (password.trim() !== "admin" && password !== "") {
            setError(PassInpDom, `Password is incorrect, try again!`)
        } else if (password.trim() === "admin") {
            setSuccess(PassInpDom)
        }

    }


    // * Handling logout 
    const logOutHandler = () => {
        setAdmin(false)
        localStorage.removeItem("Token")
    }


    //* Generate token and save to localstorage
    const tokenGenerator = () => {
        const date = Date.now().toString(36)
        const res = Math.random().toString(36).substring(2)

        return res + date
    }


    const setError = (input, message) => {
        if (input) {
            const formControl = input.parentElement;
            const small = formControl.querySelector("small")
            small.innerText = message

            formControl.classList.add("form-error")
            formControl.classList.remove("form-success");
        }

    };
    const setSuccess = (input) => {
        const forInput = input.parentElement;
        forInput.classList.remove("form-error");
        forInput.classList.add("form-success");
    };


    //Label onclick Handler
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
        else {
            setDark(true)
            localStorage.setItem("Theme", "Dark")
        }
        document.body.classList.toggle("dark")
    }


    return (
        <>
            <Head>
                <title>Patient Portal</title>
                <meta name="title" content="Patient Portal" />
                <meta name="description" content="a patient portal where nurses and doctors can log in and enter patient data It is completely secure and simple to use." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://patientportal-bawrdiii.vercel.app/" />
                <meta property="og:title" content="Patient Portal" />
                <meta property="og:description" content="a patient portal where nurses and doctors can log in and enter patient data It is completely secure and simple to use." />
                <meta property="og:image" content={Img} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://patientportal-bawrdiii.vercel.app/" />
                <meta property="twitter:title" content="Patient Portal" />
                <meta property="twitter:description" content="a patient portal where nurses and doctors can log in and enter patient data It is completely secure and simple to use." />
                <meta property="twitter:image" content={Img} />
            </Head>
            {show && < BarLoader text="Loading..." />}
            {!admin && !show &&
                <>
                    <div className="p-relative">
                        <div className="p-absolute absolute-toggle">
                            <Toggle
                                labelOnclick={labelOnclickHandler}
                                value={dark}
                                refLabel={labelRef}
                                refSpan={spanRef}
                            />
                        </div>
                    </div>
                    <MainAuth
                        headingRef={headingRef}
                        submitForm={btnOnclickHandler}
                        passInputRef={passInp}
                        userInputRef={userInp}
                    />
                </>
            }
            {admin && !show &&
                <>
                    <Navbar logOutHandler={logOutHandler} headingContent="Welcome admin" />
                    <PatientContainer />
                </>
            }

        </>

    )
}
export default MainIndex