import { useRouter } from "next/router"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { useEffect, useState, useMemo } from "react"
import { db } from "../firebaseconfig/firebaseconfig"
import Navbar from "../navbar/navbar"
import DeleteModal from "../UI/modal/deleteModal"
import Image from "next/image"
import AddUser from "../../assets/Images/adduser.png"
import Link from "next/link"


const ShowPatient = () => {
    //* Page states
    const [patName, setPatName] = useState('')
    const [age, setAge] = useState('')
    const [ill, setIll] = useState([])
    const [meds, setMeds] = useState([])
    const [src, setSrc] = useState('')
    const [msg, setMsg] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [modal, setModal] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (router.query.patId) {
            const getUserData = async () => {
                const docRef = doc(db, "Informations", router.query.patId)
                const docSanp = await getDoc(docRef)
                const result = docSanp.data()
                let imgTyp, imgSrc;
                imgSrc = result.imageSrc
                imgTyp = result.imageType
                setImageSrc(result.imageSrc)
                if (imgTyp !== "" && imgTyp !== "") {
                    setSrc(`data:${imgTyp};base64,${imgSrc}`)
                } else {
                    setSrc("")
                }
                setPatName(result.patientName)
                setAge(result.birthDate)
                setIll(result.illness)
                setMeds(result.medicines)
                setMsg(result.message)
            }
            getUserData()
        }
    }, [router.isReady])


    //!
    //* Handling patient age
    function birthHandler() {
        var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (age !== 0) {
            const date = new Date()
            var yy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            var uyy = Number(age.substring(0, 4))
            var udd = Number(age.substring(8))
            var umm = Number(age.substring(5, 7))

            if (udd > dd) {
                dd = dd + month[mm - 1]
                mm = mm - 1
            }
            if (umm > mm) {
                mm = mm + 12
                yy = yy - 1
            }
            var finalYear = yy - uyy
            var finalMonth = mm - umm
            var finalDay = dd - udd

          let result = `Patient is ${finalYear} years and ${finalMonth} months and ${finalDay} days old`

        }
        return result
    }
    
   const patientAge = useMemo(() =>  birthHandler(), [age]);

    //*Logout user
    const logOutHandler = () => {
        const token = localStorage.getItem("Token")
        if (token) {
            localStorage.removeItem("Token")
            router.push("/")
        }
        else router.push("/")
    }

    //* Modal handler
    const modalCloseHandler = () => {
        document.body.classList.remove("overflow-hidden")
        setModal(false)
    }

    // //* Delete all information
    const deletePatientHandler = async () => {
        const userDoc = doc(db, "Informations", router.query.patId)
        await deleteDoc(userDoc)
        setModal(false)
        document.body.classList.remove("overflow-hidden")
        router.push("/informations")
    }
    return (
        <>
            <DeleteModal show={modal} ModalClose={modalCloseHandler} deleteHandler={deletePatientHandler} />
            <Navbar logOutHandler={logOutHandler} headingContent={patName} />
            <section className="exact-patient">
                <div className="d-flex flex-exact-img">
                    {imageSrc !== "" ?
                        <img src={src} alt={patName} id="patPic" className="exactpat-img" />
                        :
                        <Image src={AddUser} width="70px" height="70px" alt={patName} className="no-img" />
                    }

                </div>
                <h2><span className="name">Name: </span>{patName}</h2>
                <section className="d-grid-exact">

                    {
                        age !== "" ? (
                            <div className="d-flex flex-exact my-1">
                                <strong className="reason">Patient Age
                                </strong>
                                <p>{patientAge}</p>

                            </div>
                        ) : <strong className="reason">َAge isn&apos;t entered</strong>
                    }


                    <div className="d-flex flex-exact my-1">
                        {ill.length !== 0 ? (
                            <>
                                <strong className="reason">Patient illness
                                </strong>
                                <ul className="ul-med">
                                    {ill.map(item => <li key={item} id={item}>{item}</li>)}
                                </ul>
                            </>
                        ) :
                            <>
                                <strong className="reason">Ill isn&apos;t entered
                                </strong>
                            </>
                        }
                    </div>



                    <div className="d-flex flex-exact my-1">
                        {meds.length !== 0 ?
                            <>
                                <strong className="reason">Patient medicines
                                </strong>
                                <ul className="ul-med">{
                                    meds.map(item => <li key={item} id={item}>{item}</li>
                                    )
                                }</ul>
                            </>
                            : <>
                                <strong className="reason">
                                    There are no medicines
                                </strong>
                            </>}
                    </div>

                    <div className="d-flex flex-exact my-1">
                        {msg !== "" ? (
                            <>
                                <strong className="reason">Specific message
                                </strong>
                                <p>{msg}</p>
                            </>
                        ) : <strong className="reason">There isnt any specific message
                        </strong>}
                    </div>
                </section>

                <div className="exact-btn-container">
                    <button className="btn btn-delete delete-all" type="button" onClick={() => {
                        setModal(true)
                        document.body.classList.add("overflow-hidden")
                    }
                    }>Delete patient infos</button>
                    <Link href={`/informations/edit/${router.query.patId}`}>
                        <button className="btn btn-info">
                            Edit Info
                        </button>
                    </Link>
                </div>
            </section>
        </>

    )
}

export default ShowPatient
