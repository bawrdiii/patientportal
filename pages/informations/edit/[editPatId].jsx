import { useRouter } from "next/router"
import Navbar from "../../../components/navbar/navbar";
import { BarLoader } from "react-spinner-animated"
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../components/firebaseconfig/firebaseconfig";
import Image from "next/image";
import DefaultImg from "../../../assets/Images/adduser.png"


const ExactPatEdit = () => {
    const [loading, setLoading] = useState(false)
    const [newPatName, setNewPatName] = useState("")
    const [newPatAge, setNewPatAge] = useState("")
    const [newPatIll, setnewPatIll] = useState("")
    const [med, setMed] = useState("")
    const [message, setNewMessage] = useState("")
    const [imgSrc, setImgsrc] = useState("")
    const [imgType, setImgType] = useState("")
    const [file, setFile] = useState('')
    const [src, setSrc] = useState("")
    const [ills, setIlls] = useState([])
    const [meds, setMeds] = useState([])
    const router = useRouter()

    var extension = "", base64String = ""

    //?References
    const nameLabel = useRef()
    const illLabel = useRef()
    const ulIll = useRef()
    const medLabel = useRef()
    const ulMed = useRef()
    const msgLabel = useRef()
    const dateLabel = useRef()
    const imgRef = useRef()
    const fileImg = useRef()

    //? Getting data from API
    useEffect(() => {
        if (router.query.editPatId) {
            const getUserData = async () => {
                const docRef = doc(db, "Informations", router.query.editPatId)
                const docSnap = await getDoc(docRef)
                const result = docSnap.data()
                console.log(result);
                setNewPatName(result.patientName)
                setNewPatAge(result.birthDate)
                setIlls(result.illness)
                setMeds(result.medicines)
                setNewMessage(`${result.message} `)
                setImgType(result.imageType)
                setImgsrc(result.imageSrc)
                setSrc(`data:${result.imageType};base64,${result.imageSrc}`)
            }
            getUserData()
        }
    }, [router.isReady])

    //? Handling change 
    const onChangeGeneral = (e, set, ref) => {
        var value = e.target.value
        set(value)
        const elDom = ref.current
        if (value !== "") {
            elDom.classList.add("label-info-active")
        }
        else {
            elDom.classList.remove("label-info-active")
        }
    }

    //* Checking values
    const checkGeneral = () => {
        newPatName !== "" && nameLabel.current.classList.add("label-info-active");
        message !== "" && msgLabel.current.classList.add("label-info-active")
        newPatAge !== "" && dateLabel.current.classList.add("label-info-active")
    }

    checkGeneral()
    //* Handling user logout
    const logOutHandler = () => {
        localStorage.removeItem("Token")
        router.push("/")
    }


    const removePicture = () => {
        const img = imgRef.current
        extension = ""
        base64String = ""
        img.removeAttribute("src")
        img.removeAttribute("alt")
        img.removeAttribute("class")
        img.style.height = '0'
        img.style.width = '0'
    }

    //? Getting pat image
    const HandlePicture = () => {
        const fileDOm = fileImg.current
        var files = fileDOm.files
        const img = imgRef.current
        if (files.length > 0) {
            var fileReader = new FileReader()
            fileReader.onload = function (e) {
                base64String = fileReader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                img.removeAttribute("style")
                img.setAttribute("src", e.target.result)
                img.setAttribute("alt", "Patient picture")
                img.classList.add("exist")
                img.classList.add("pat-img")
            }
            extension = files[0].type
            fileReader.readAsDataURL(files[0])
        }

    }

    //? Add med as li
    const addLiHandler = (array, value, set, label) => {

        const li = document.createElement("li")
        if (value !== "") {
            array.push(value)
            li.className = `li-med`
            set("")
            label.current.classList.remove("label-info-active")
        } else if (value === "") return

        li.addEventListener("click", function (e) {
            let id = e.target.id
            let index = array.indexOf(id)
            if (index > -1) {
                array.splice(index, 1)
            }

        })
    }

    const deleteLiHandler = async (e, array, set) => {
        let id = e.target.id
        let index = array.indexOf(id)
        if (index > -1) array.splice(index, 1)
        set([...array])
    }


    const removepatPic = () => {
        setImgType("")
        setImgsrc("")
    }

    // * Handling submit form
    const submitFormHandler = async (e) => {
        e.preventDefault()
        if (base64String === "") {
            setLoading(true)
            await (setDoc(doc(db, "Informations", router.query.editPatId), {
                patientName: newPatName,
                birthDate: newPatAge,
                medicines: meds,
                illness: ills,
                message: message.trim(),
                imageType: imgType,
                imageSrc: imgSrc
            }))
        }
        else {
            setLoading(true)
            await (setDoc(doc(db, "Informations", router.query.editPatId), {
                patientName: newPatName,
                birthDate: newPatAge,
                medicines: meds,
                illness: ills,
                message: message.trim(),
                imageType: extension,
                imageSrc: base64String
            }))
        }
        setTimeout(() => {
            router.push(`/informations/${router.query.editPatId}`)
        }, 1000);
    }
    return (
        <>
            {loading ? <BarLoader text="Loading..." /> : (
                <>
                    <Navbar logOutHandler={logOutHandler} headingContent="Edit Page" />

                    <section className="container-infos">
                        <div className="container-img p-relative">
                            {imgSrc !== "" ?
                                <>
                                    <img
                                        className="exactpat-img "
                                        src={src}
                                        alt={newPatName}
                                    />
                                    <p className="delete-icon" title="Delete image"
                                        onClick={removepatPic}
                                    ></p>
                                </>
                                :
                                <Image
                                    src={DefaultImg}
                                    alt={newPatName}
                                    height="90px"
                                    width="90px"
                                    className="no-img"
                                />

                            }
                        </div>
                        <form className="form-patient-info edit" method="post"
                            onSubmit={submitFormHandler}
                        >
                            <div className="d-flex flex-form my-1">
                                <input
                                    type="text"
                                    placeholder="Patient name"
                                    id="new-patient-name"
                                    name="patientName"
                                    className="input input-info"
                                    value={newPatName}
                                    onChange={(e) => onChangeGeneral(e, setNewPatName, nameLabel)}
                                />
                                <label htmlFor="new-patient-name"
                                    className="form-label label-info"
                                    ref={nameLabel}>
                                    Patient name
                                </label>
                            </div>

                            <div className="d-flex flex-form my-1">
                                <input
                                    type="date"
                                    id="new-patient-age"
                                    name="patientAge"
                                    className="input input-info input-date"
                                    value={newPatAge}
                                    onChange={e => onChangeGeneral(e, setNewPatAge, dateLabel)}
                                />
                                <label htmlFor="new-patient-age"
                                    className="form-label label-info"
                                    ref={dateLabel}
                                >
                                    Birthdate
                                </label>
                            </div>

                            <div className="d-flex flex-form my-1 p-relative">
                                <input
                                    type="text"
                                    placeholder="Patient illness"
                                    id="new-patient-ill"
                                    name="patientIll"
                                    className="input input-info"
                                    value={newPatIll}
                                    onChange={(e) => onChangeGeneral(e, setnewPatIll, illLabel)}
                                />
                                <label htmlFor="new-patient-ill"
                                    className="form-label label-info"
                                    ref={illLabel}>
                                    Illness
                                </label>
                                <button className="btn-add p-absolute" type="button" onClick={(e) => addLiHandler(ills, newPatIll, setnewPatIll, illLabel)}>+</button>
                            </div>
                            <ul className="ul-med" ref={ulIll}>
                                {ills.length !== 0 &&
                                    ills.map(ill => {
                                        return (
                                            <li key={ill} id={ill} className="li-med"
                                                onClick={e => deleteLiHandler(e, ills, setIlls)}>{ill}</li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="d-flex flex-form my-1 p-relative">
                                <input
                                    type="text"
                                    name="patientMedicine"
                                    id="new-patient-medicine"
                                    className="input input-info"
                                    placeholder="New medicine"
                                    value={med}
                                    onChange={(e) => onChangeGeneral(e, setMed, medLabel)}
                                />
                                <label htmlFor="new-patient-medicine" className="form-label label-info"
                                    ref={medLabel}>Medicines</label>
                                <button className="btn-add p-absolute" type="button" onClick={(e) => addLiHandler(meds, med, setMed, medLabel)}>
                                    +
                                </button>
                            </div>
                            <ul className="ul-med" ref={ulMed}>{
                                meds.length !== 0 && meds.map(med => {
                                    return (
                                        <li key={med} id={med} className="li-med" onClick={e => deleteLiHandler(e, meds, setMeds)}>
                                            {med}
                                        </li>
                                    )
                                })
                            }</ul>
                            <div className="d-flex flex-form my-1">
                                <textarea
                                    className="input input-info"
                                    name="new-additional-message"
                                    id="new-additional"
                                    value={message}
                                    onChange={e => onChangeGeneral(e, setNewMessage, msgLabel)}
                                ></textarea>
                                <label htmlFor="new-additionl"
                                    className="form-label label-info"
                                    ref={msgLabel}>Specific message</label>
                            </div>

                            <div className="d-flex flex-form my-1">
                                <input
                                    className="file-inp"
                                    type="file"
                                    name="file"
                                    id="patnewpic"
                                    value={file}
                                    onChange={HandlePicture}
                                    ref={fileImg}
                                />
                                <label htmlFor="patnewpic" className="file-label" >
                                    Add new picture
                                </label>
                            </div>

                            <div className="d-flex flex-img">
                                <img ref={imgRef} />
                                <button className="btn btn-delete delete-pic dlt-hdn" type="button"
                                    onClick={removePicture}
                                >
                                    Remove picture
                                </button>
                            </div>
                            <div className="exact-btn-container">
                                <button type="button" onClick={() => router.push(`/informations/${router.query.editPatId}`)}
                                    className="btn edit-btn"
                                >Cancel </button>
                                <button type="submit"
                                    className="btn edit-btn save-btn"
                                >Save changes</button>

                            </div>
                        </form>
                    </section>
                </>
            )
            }
        </>
    )
}

export default ExactPatEdit