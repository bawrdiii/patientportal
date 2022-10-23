import { useState } from "react"
import MainAuth from "../components/mainpage/mainAuthentication"



const MainIndex = () => {

    const [admin, setAdmin] = useState(false)

    const btnOnclickHandler = e => {
        e.preventDefault()
        
    }

    return <MainAuth buttonOnclickHandler={btnOnclickHandler} />

}
export default MainIndex