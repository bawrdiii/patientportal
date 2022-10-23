import { useRef, useState } from "react";
import Authentication from "../authentication/authentication";



const MainAuth = ({
    buttonOnclickHandler
}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)

    //? ref to elements
    const userLabel = useRef()
    const passLabel = useRef()
    const capsLock = useRef()

    // ! Data for login
    const loginInfo = "admin"

    //* checking Caps lock 
    const checkCapsLock = e => {
        const capsLockEl = capsLock.current
        if (e.getModifierState("CapsLock")) {
            capsLockEl.classList.remove("hidden")
        }
        else capsLockEl.classList.add("hidden")
    }

    //* Handling username input onCHange
    const userOnchangeHandler = e => {
        let value = e.target.value;
        setUsername(value);
        if (value !== '') {
            userLabel.current.classList.add("label-active")
        }
        else userLabel.current.classList.remove("label-active")
    }

    //* Handling password input Onchange
    const passOnchangeHandler = e => {
        let value = e.target.value;
        setPassword(value)
        if (value !== '') {
            passLabel.current.classList.add("label-active")
        }
        else passLabel.current.classList.remove("label-active")
    }
    return (
        <>
            <Authentication
                userValue={username}
                userOnchange={userOnchangeHandler}
                userLabelRef={userLabel}
                passValue={password}
                passOnchange={passOnchangeHandler}
                passLabelRef={passLabel}
                checkingCapsLock={checkCapsLock}
                capslockDetect={capsLock}
                SubmitForm={submitHandler}
                btnOnclick={buttonOnclickHandler}

            />
        </>
    )
}

export default MainAuth;