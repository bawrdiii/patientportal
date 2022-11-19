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
    }, [userCollectionRef])

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
            {users.length !== 0 ? (
                <section className="infos">
                    {users.map(item => {
                        return (
                            <Link href={`/informations/${item.id}`} key={item.id}>
                                <section className="showpat-container">
                                    <h3 key={item.patientName}>{item.patientName}</h3>
                                    <img
                                        src={`data:${item.imageType};base64,${item.imageSrc}`}
                                        key={item.id}
                                        // height="140px"
                                        // width="110px"
                                        alt={item.patientName}
                                        className="info-img"
                                    />
                                </section>
                            </Link>
                        )
                    })}
                </section>
            ) : (
                <section className="showpat-container nopat-info">
                    No information available
                </section>
            )}
        </>
    )
}

export default Infos