import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import Navbar from "../../components/navbar/navbar"
import { db } from "../../components/firebaseconfig/firebaseconfig"
import { collection, doc, getDocs } from "firebase/firestore"
import Image from "next/image"
import AddUser from '../../assets/Images/adduser.png'
import Link from "next/link"
import SearchBar from "../../components/search bar/searchBar"
const Infos = () => {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    const userCollectionRef = collection(db, "Informations")

    const searchLabel = useRef()

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

    const searchHandler = e => {
        let value = e.target.value
        setSearch(value)
        value !== "" ?
            searchLabel.current.classList.add("label-info-active") :
            searchLabel.current.classList.remove("label-info-active")

        if (value.length >= 2) {
            var valueLowerCase = value.toLowerCase()
            for (let i = 0; i < users.length; i++) {
                users.map(item => {
                    var patNameLower = item.patientName.toLowerCase()
                    if (patNameLower.indexOf(valueLowerCase) > -1) {
                        document.querySelector(`#${patNameLower.split(" ").join("")}`).style.display = "flex"
                    }
                    else {
                        document.querySelector(`#${patNameLower.split(" ").join("")}`).style.display = "none"
                    }
                })
            }
        }
        else if (value.length <= 2) {
            users.map(item => {
                var id = item.patientName.split(" ").join("").toLowerCase()
                document.querySelector(`#${id}`).style.display = "flex"
            })
        }
    }

    return (
        <>
            <Navbar logOutHandler={logOutHandler} headingContent="Informations" />
            {users.length !== 0 ? (
                <>
                    <SearchBar
                        search={search}
                        searchHandler={searchHandler}
                        searchLabel={searchLabel}
                    />

                    <section className="infos">
                        {users.map(item => {
                            {
                                item.imageSrc === "" && console.log(`slm`)
                            }
                            return (
                                <Link href={`/informations/${item.id}`} key={item.id}>
                                    <section className="showpat-container" id={item.patientName.split(" ").join("").toLowerCase()}>
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
                </>
            ) : (
                <section className="showpat-container nopat-info">
                    No information available
                </section>
            )}
        </>
    )
}

export default Infos