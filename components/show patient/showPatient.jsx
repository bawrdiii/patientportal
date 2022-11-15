import { useRouter } from "next/router"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebaseconfig/firebaseconfig"
import Navbar from "../navbar/navbar"
import Image from "next/image"



const ShowPatient = ({ ageEdit, onChangeGeneral, ageEditSave }) => {
    //* Page states
    const [patName, setPatName] = useState('')
    const [age, setAge] = useState('')
    const [ill, setIll] = useState([])
    const [src, setSrc] = useState('')
    const [meds, setMeds] = useState([])
    const [msg, setMsg] = useState('')
    const [edit, setEdit] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [imageType, setImageType] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (router.query.patId) {
            const getUserData = async () => {
                const docRef = doc(db, "Informations", router.query.patId)
                const docSanp = await getDoc(docRef)
                const result = docSanp.data()
                setImageSrc(result.imageSrc)
                setImageType(result.imageType)
                let imgTyp, imgSrc;
                imgSrc = result.imageSrc
                imgTyp = result.imageType
                setSrc(`data:${imgTyp};base64,${imgSrc}`)
                setPatName(result.patientName)
                setAge(result.birthDate)
                setIll(result.illness)
                setMeds(result.medicines)
                setMsg(result.message)
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

    const updateDocMed = async (e) => {
        var id = e.target.id;
        e.target.remove()
        const index = meds.indexOf(id)
        if (index > -1) {
            meds.splice(index, 1)
        }
        await setDoc(doc(db, "Informations", router.query.patId), {
            patientName: patName,
            birthDate: age,
            medicines: meds,
            imageType: imageType,
            imageSrc: imageSrc,
            illness: ill.map(item => item),
            message: msg
        })

    }

    //* Submit form handler

    const submitGeneral = async (e) => {

    }
    //* Show edit field 
    const showEditHandler = e => {
        const parent = e.target.parentElement
        let bool = parent.classList.contains('editTrue')
        if (!bool) {

            parent.classList.add("d-block")
            setTimeout(() => {
                parent.classList.add("editTrue")
            }, 1000);
        }
        else {
            parent.classList.remove("editTrue")
            setTimeout(() => {
                parent.classList.remove("d-block")
            }, 1000);
        }

    }
    const showEditHandlerIll = e => {
        const parent = e.target.parentElement
        let bool = parent.classList.contains('editTrue')
        if (!bool && !edit) {
            setEdit(true)
            parent.classList.add("d-block")
            setTimeout(() => {
                parent.classList.add("editTrue")
            }, 1000);
        }
        else {
            setEdit(false)
            parent.classList.remove("editTrue")
            setTimeout(() => {
                parent.classList.remove("d-block")
            }, 1000);
        }

    }

    const updateDocIll = async (e) => {
        const parent = e.target.parentElement
        const parentFchild = parent.firstChild
        const pFchildValue = parentFchild.value
        if (pFchildValue !== "") {
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: age,
                medicines: meds,
                imageType: imageType,
                imageSrc: imageSrc,
                illness: ill.map(item => item),
                message: msg
            })
        }
    }

    const deleteDocIll = async (e) => {

        var id =
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: age,
                medicines: meds,
                imageType: imageType,
                imageSrc: imageSrc,
                illness: "",
                message: msg
            })
        // document.location.reload()
    }

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
            <form className="exact-patient">
                {src !== "" ? <Image src={src} height="110px" width="85px" alt={patName} />
                    : <p>There is no picture </p>
                }
                <h2><span className="name">Name: </span>{patName}</h2>
                <section className="d-grid-exact">

                    {
                        age !== "" ? (
                            <div className="d-flex flex-exact my-1">
                                <strong className="reason">Patient Age
                                    <span className="edit-doc" onClick={e => showEditHandler(e)}></span>
                                </strong>
                                <p>{result}</p>
                                <div className="edit transition">
                                    <input type="date" className="input input-info" name="newAge" />
                                    <button className="btn edit-btn" type="submit" onClick={submitGeneral}>save</button>
                                </div>
                            </div>
                        ) : <strong className="reason">َAge isn't entered</strong>
                    }


                    <div className="d-flex flex-exact my-1">
                        {ill !== "" ? (
                            <>
                                <strong className="reason">Patient illness
                                    <span className="edit-doc" onClick={showEditHandlerIll}></span>
                                </strong>
                                {!edit && <ul className="ul-med">
                                    {ill.map(item => <li key={item}>{item}</li>)}
                                </ul>}
                                {edit && <ul onClick={e => deleteDocIll(e)} className="ul-med">
                                    {
                                        ill.map(item => <li key={item} id={item} onClick={e => deleteDocIll(e)} className="li-med">{item}</li>)
                                    }

                                </ul>}
                            </>
                        ) :
                            <>
                                <strong className="reason">Ill isn't entered
                                    <span className="edit-doc" onClick={showEditHandler}></span>
                                </strong>
                            </>
                        }
                        <div className="edit transition">
                            <input type="text" className="input input-info" placeholder="New illness or for delete illness now click" />
                            <button className="btn edit-btn" onClick={updateDocIll}>save</button>

                        </div>
                    </div>



                    <div className="d-flex flex-exact my-1">
                        {meds.length !== 0 ?
                            <>
                                <strong className="reason">Patient medicines
                                    <span className="edit-doc" onClick={showEditHandler}></span>
                                </strong>
                                <ul className="ul-med">{
                                    meds.map(item => <li className="li-med" key={item} id={item} onClick={(e) => updateDocMed(e)}>{item}</li>
                                    )
                                }</ul>
                            </>
                            : <>
                                <strong className="reason">
                                    There are no medicines
                                    <span className="edit-doc" onClick={showEditHandler}></span>
                                </strong>
                            </>}
                        <div className="edit transition">
                            <input type="text" className="input input-info" placeholder="Add new medicine" />
                            <button className="btn edit-btn">save</button>
                        </div>
                    </div>

                    {msg !== "" ? (
                        <div className="d-flex flex-exact my-1">
                            <strong className="reason">Additional message
                                <span className="edit-doc" onClick={showEditHandler}></span>
                            </strong>
                            <p>{msg}</p>
                            <div className="edit transition">
                                <input type="text" className="input input-info" placeholder="Add message" />
                                <button className="btn edit-btn">save</button>

                            </div>
                        </div>
                    ) : <strong className="reason">There ist any additional message</strong>}
                </section>

            </form>
        </>

    )
}

export default ShowPatient