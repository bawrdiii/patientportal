import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar/navbar"
import { db } from "../../components/firebaseconfig/firebaseconfig"
import { collection, doc, getDocs } from "firebase/firestore"
import Image from "next/image"
import Link from "next/link"
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
                        <Link href={`/informations/${item.id}`} key={item.id}>
                            <section>
                                <h3 key={item.patientName}>{item.patientName}</h3>
                                <Image
                                    src={`data:${item.imageType};base64,${item.imageSrc}`}
                                    key={item.id}
                                    height="400"
                                    width="400x"
                                />
                            </section>
                        </Link>
                    )
                })}
            </section>
        </>
    )
}

export default Infos