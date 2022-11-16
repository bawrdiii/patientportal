import { useRouter } from "next/router"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebaseconfig/firebaseconfig"
import Navbar from "../navbar/navbar"



const ShowPatient = () => {
    //* Page states
    const [patName, setPatName] = useState('')
    const [age, setAge] = useState('')
    const [ill, setIll] = useState([])
    const [src, setSrc] = useState('')
    const [meds, setMeds] = useState([])
    const [file, setFile] = useState('')
    const [msg, setMsg] = useState('')
    const [newMsg, setNewMsg] = useState("")
    const [edit, setEdit] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [imageType, setImageType] = useState('')
    const [editBtn, setEditBtn] = useState(false)

    //* Declaring variables
    var result, base64String = '', extension

    const router = useRouter()

    const inpFile = useRef()

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
                setImageType(result.imageType)
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
                setNewMsg(`${result.message} `)
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
            illness: ill,
            message: msg
        })

    }

    //!
    //* File handler
    const fileHandler = () => {
        const fileDom = inpFile.current
        var file = fileDom.files

        if (file.length > 0) {
            var fileReader = new FileReader()
            fileReader.onload = function (e) {
                base64String = fileReader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "")
            };
            extension = file[0].type
            fileReader.readAsDataURL(file[0])
        }
    }

    //!
    //* Submit form handler

    const submitGeneral = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const inpObj = Object.fromEntries(formData)

        const newAge = formData.get("newAge")
        const newIll = formData.get("newIll")
        const newMed = formData.get("newMed")
        if (newAge !== "") {
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: newAge,
                medicines: meds,
                imageType: imageType,
                imageSrc: imageSrc,
                illness: ill,
                message: msg
            })
            document.location.reload()
        }
        if (newIll !== "") {
            ill.push(newIll)
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: age,
                medicines: meds,
                imageType: imageType,
                imageSrc: imageSrc,
                illness: ill,
                message: msg
            })
            setTimeout(() => {
                document.location.reload()
            }, 500);
        }
        if (newMed !== "") {
            meds.push(newMed)
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: age,
                medicines: meds,
                imageType: imageType,
                imageSrc: imageSrc,
                illness: ill,
                message: msg
            })
            setTimeout(() => {
                document.location.reload()
            }, 500);
        }
        if (newMsg.trim() !== msg) {
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: age,
                medicines: meds,
                imageType: imageType,
                imageSrc: imageSrc,
                illness: ill,
                message: newMsg
            })
            document.location.reload()
        }
    };

    // !

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
    // !

    const deleteDocIll = async (e) => {
        var id = e.target.id;
        e.target.remove()
        const index = ill.indexOf(id)
        if (index > -1) {
            ill.splice(index, 1)
        }
        await setDoc(doc(db, "Informations", router.query.patId), {
            patientName: patName,
            birthDate: age,
            medicines: meds,
            imageType: imageType,
            imageSrc: imageSrc,
            illness: ill,
            message: msg
        })
        document.location.reload()
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


    //* New patient pic handler
    const patPicHandler = async () => {
        editBtn ? setEditBtn(false) : setEditBtn(true)
        console.log(base64String, extension);
        if (base64String !== "" || base64String == undefined && extension !== undefined) {
            setSrc(`data:${extension};base64,${base64String}`)
            setImageSrc(base64String)
            await setDoc(doc(db, "Informations", router.query.patId), {
                patientName: patName,
                birthDate: age,
                medicines: meds,
                imageType: extension,
                imageSrc: base64String,
                illness: ill,
                message: msg
            })
        }
    }

    //!
    //* Delete patient pic handler
    const deletePicHandler = () => {
        editBtn ? setEditBtn(false) : setEditBtn(true)
        setSrc("")
        setImageSrc("")

    }

    return (
        <>
            <Navbar logOutHandler={logOutHandler} />
            <form className="exact-patient" onSubmit={submitGeneral}>
                <div className="d-flex flex-exact-img">
                    {imageSrc !== "" ?
                        <img src={src} alt={patName} id="patPic" />
                        :
                        <strong className="reason">There is no picture
                            <input type="file" className="file-inp" id="patNewPic" value={file}
                                onChange={fileHandler} ref={inpFile}
                            />
                            <label className="edit-doc r-0" htmlFor="patNewPic" onClick={() => setEditBtn(true)}>
                            </label>
                        </strong>
                    }


                    {editBtn ? <button className="btn edit-btn" type="button" onClick={patPicHandler}>save</button> :
                        <button className="btn edit-btn" type="button" onClick={deletePicHandler}>delete</button>
                    }
                </div>
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
                                    <button className="btn edit-btn">save</button>
                                </div>
                            </div>
                        ) : <strong className="reason">َAge isn't entered</strong>
                    }


                    <div className="d-flex flex-exact my-1">
                        {ill.length !== 0 ? (
                            <>
                                <strong className="reason">Patient illness
                                    <span className="edit-doc" onClick={showEditHandlerIll}></span>
                                </strong>
                                {!edit && <ul className="ul-med">
                                    {ill.map(item => <li key={item} id={item}>{item}</li>)}
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
                            <input
                                className="input input-info"
                                placeholder="New illness or for delete illness now click"
                                type="text"
                                name="newIll"
                            />
                            <button className="btn edit-btn">save</button>

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
                            <input
                                className="input input-info"
                                placeholder="Add new medicine"
                                type="text"
                                name="newMed"
                            />
                            <button className="btn edit-btn">save</button>
                        </div>
                    </div>

                    <div className="d-flex flex-exact my-1">
                        {msg !== "" ? (
                            <>
                                <strong className="reason">Additional message
                                    <span className="edit-doc" onClick={showEditHandler}></span>
                                </strong>
                                <p>{msg}</p>
                            </>
                        ) : <strong className="reason">There ist any additional message
                            <span className="edit-doc" onClick={showEditHandler}></span>
                        </strong>}
                        <div className="edit transition">
                            <input
                                className="input input-info"
                                placeholder="Add message"
                                type="text"
                                value={newMsg}
                                onChange={e => setNewMsg(e.target.value)}
                                name="newMsg"
                            />
                            <button className="btn edit-btn">save</button>

                        </div>
                    </div>
                </section>

            </form>
        </>

    )
}

export default ShowPatient