import { useRouter } from "next/router"
import Addpatient from "../../components/add patient/addPatient"
import Navbar from "../../components/navbar/navbar"

const MainPatient = () => {

    const router = useRouter()

    const logOutHandler = () => {
        const token = localStorage.getItem("Token")
        if (token) {
            localStorage.removeItem("Token")
            router.push("/")
        }
        else router.push("/")
    }

    return (
        <>
            <Navbar logOutHandler={logOutHandler} headingContent="Add patient" />
            <Addpatient />
        </>
    )
}
export default MainPatient