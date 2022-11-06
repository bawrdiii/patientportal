import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar/navbar"
import { db } from "../../components/firebaseconfig/firebaseconfig"
import { collection, doc, getDocs } from "firebase/firestore"

const Infos = () => {

    const [users, setUsers] = useState([])

    const userCollectionRef = collection(db, "Informations")

    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            router.push("/")
        }

        const getUser = async () => {
            const data = await getDocs(userCollectionRef)
            setUsers(data.docs.map(item => ({ ...item.data(), id: item.id })))
        }

        getUser()
    }, [])

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
            <Navbar logOutHandler={logOutHandler} />
            <section className="infos">
                {users.map(item => {
                    return (
                        <>
                            <h3 key={item.patientName}>{item.patientName}</h3>

                        </>
                    )
                })}
            </section>
        </>
    )
}

export default Infos