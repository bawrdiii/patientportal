import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar/navbar"
import { db } from "../../components/firebaseconfig/firebaseconfig"
import { collection, doc, getDocs } from "firebase/firestore"
import Image from "next/image"
import AddUser from '../../assets/Images/adduser.png'
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
            <Navbar logOutHandler={logOutHandler} headingContent="Informations" />
            {users.length !== 0 ? (
                <section className="infos">
                    {users.map(item => {
                        {
                            item.imageSrc === "" && console.log(`slm`)
                        }
                        return (
                            <Link href={`/informations/${item.id}`} key={item.id}>
                                <section className="showpat-container">
                                    <h3 key={item.patientName}>{item.patientName}</h3>
                                    {item.imageType !== "" ?
                                        <img
                                            src={`data:${item.imageType};base64,${item.imageSrc}`}
                                            key={item.id}
                                            alt={item.patientName}
                                            className="info-img"
                                        />
                                        :
                                        <Image className="no-img"
                                            width="110px" height="110px"
                                            src={AddUser}
                                        />
                                    }
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