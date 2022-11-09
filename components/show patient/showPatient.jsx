import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebaseconfig/firebaseconfig"
import Navbar from "../navbar/navbar"
import Image from "next/image"


const ShowPatient = () => {
    const [patName, setPatName] = useState('')
    const [age, setAge] = useState('')
    const [ill, setIllness] = useState('')
    const [src, setSrc] = useState('')
    const [meds, setMeds] = useState([])

    const router = useRouter()

    useEffect(() => {
        if (router.query.patId) {
            const getUserData = async () => {
                const docRef = doc(db, "Informations", router.query.patId)
                const docSanp = await getDoc(docRef)
                const result = docSanp.data()
                let imgSrc, imageType
                imgSrc = result.imageSrc;
                imageType = result.imageType
                setSrc(`data:${imageType};base64,${imgSrc}`)
                setPatName(result.patientName)
                setAge(result.birthDate)
                setIllness(result.illness)
                setMeds(result.medicines)
            }
            getUserData()
        }

    }, [router.isReady])

    //* Declaring result
    var result


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

            result = `Patient is ${finalYear} years and ${finalMonth} months and ${finalDay} days old`

        }
        return result
    }
    birthHandler()


    //*Logout user
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
            <section className="exact-patient">
                {src !== "" ? <Image src={src} height="110px" width="85px" alt={patName} />
                    : <p>There is no picture </p>
                }
                <h2><span className="name">Name: </span>{patName}</h2>
                <section className="d-grid-exact">

                    <div className="d-flex flex-exact my-1">
                        <strong className="reason">Patient Age</strong>
                        <p>{result}</p>
                        <div className="edit transition hidden">
                            <input type="date" className="input input-info" />
                        </div>
                    </div>

                    <div className="d-flex flex-exact my-1">
                        <strong className="reason">Patient illness</strong>
                        <p>{ill}</p>
                        <div className="edit transition hidden">
                            <input type="text" className="input input-info" />
                        </div>
                    </div>

                    {meds.length !== 0 ?

                        <div className="d-flex flex-exact my-1">
                            <strong className="reason">Patient medicines</strong>
                            <p>{
                                meds.map(item => <p>{item}</p>)
                            }</p>
                            <div className="edit transition hidden">
                                <input type="text" className="input input-info" />
                            </div>
                        </div>
                        : <strong className="reason">There are no medicines</strong>}

                </section>

            </section>
        </>

    )
}

export default ShowPatient