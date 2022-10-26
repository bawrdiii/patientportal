import { useEffect, useRef, useState } from "react"
import PatientContainer from "../components/add patient/patientContainer"
import MainAuth from "../components/mainpage/mainAuthentication"
import Navbar from "../components/navbar/navbar"



const MainIndex = () => {
    //? define administrator
    const [admin, setAdmin] = useState(false)

    //? ref to elements
    const headingRef = useRef()
    const userInp = useRef()
    const passInp = useRef()

    // * UseEffect 
    useEffect(() => {
        var token = localStorage.getItem("Token")

        if (token) {
            setAdmin(true)
        }
        else {
            setAdmin(false)
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
            headingDom.classList.add("welcome")
            var token = tokenGenerator()
            localStorage.setItem("Token", `Bearer ${token}`)
            setTimeout(() => {
                setAdmin(true)

                headingDom.classList.remove("welcome")
            }, 2000);
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
        const allCharacter = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCEDFGHIJKLMNOPQRSTUVWXYZ`~-_'
        var date = new Date()
        var res = date.getTime().toString(36)
        for (var i = 0; i <= 10; i++) {
            var randomNum = Math.floor(Math.random() * allCharacter.length)
            res += allCharacter.substring(randomNum, randomNum + 1)
        }
        return res
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
                        <Navbar logOutHandler={logOutHandler} />
                        <PatientContainer />
                    </>
                )

            }
        </>
    )
}
export default MainIndex