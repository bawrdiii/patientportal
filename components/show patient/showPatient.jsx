import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebaseconfig/firebaseconfig"
import Navbar from "../navbar/navbar"


const ShowPatient = () => {
    const [patName, setPatName] = useState('')
    const [age, setAge] = useState(0)

    const router = useRouter()

    // const userCollectionRef = collection(db, "Informations")

    useEffect(() => {
        if (router.query.patId) {

            const getUserData = async () => {

                const docRef = doc(db, "Informations", router.query.patId)
                const docSanp = await getDoc(docRef)
                const result = docSanp.data()
                setPatName(result.patientName)
                setAge(result.birthDate)
            }
            getUserData()
        }
        console.log(age);

    })

    const birthHandler = () => {
        if (age !== 0) {
            const date = new Date()
            console.log(date.toLocaleDateString())
        }
    }
    birthHandler()
    return (
        <>
            <Navbar />
            <section>
                <h2>
                    {patName}
                </h2>
                { }
            </section>
        </>

    )
}

export default ShowPatient