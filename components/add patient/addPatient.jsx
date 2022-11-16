import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebaseconfig/firebaseconfig"
import { BarLoader } from "react-spinner-animated"


const Addpatient = () => {

    //? States
    const [loading, setLoading] = useState(false)
    const [patName, setPatName] = useState('')
    const [patAge, setPatAge] = useState('')
    const [ill, setIll] = useState("")
    const [ills, setIlls] = useState([])
    const [addMsg, setAddMsg] = useState('')
    const [file, setFile] = useState('')
    const [med, setMed] = useState('')
    const [meds, setMeds] = useState([])
    const [date, setDate] = useState()
    //? Refrences
    const labelNameRef = useRef()
    const labelIllRef = useRef()
    const labelMsgref = useRef()
    const inpFile = useRef()
    const imgRef = useRef()
    const medLabel = useRef()
    const ulMed = useRef()

    var extension, base64String = '';


    const userCollectionRef = collection(db, "Informations")

    const route = useRouter()
    //* Checking if token is available or not
    useEffect(() => {
        const token = localStorage.getItem("Token")
        if (!token) {
            route.push("/")
        }
        //* Getting today date
        const date = new Date()
        let yy = date.getFullYear()
        let mm = date.getMonth() + 1
        let dd = date.getDate()

        const res = `${yy}/${mm}/${dd}`
        setDate(res)
    })

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

    //* Get image from file
    const handleChange = () => {
        const fileDom = inpFile.current
        var file = fileDom.files;
        const img = imgRef.current

        if (file.length > 0) {
            var fileReader = new FileReader()
            fileReader.onload = function (e) {

                base64String = fileReader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");

                img.setAttribute("src", e.target.result);
                img.setAttribute("alt", "Patient pictue");

            };
            extension = file[0].type;

            fileReader.readAsDataURL(file[0])
        }
        console.log(extension);

    }

    const dateHandler = e => {
        let val = e.target.value
        setPatAge(val)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (patName === "" && patAge === "" && ill === "" && addMsg === "") {
            setLoading(false)
        }
        if (base64String !== "" || undefined && extension !== "" || undefined &&
            patName !== "" &&
            patAge !== "" &&
            ill.length !== 0
        ) {
            setLoading(true)
            await addDoc(userCollectionRef, {
                birthDate: patAge,
                illness: ill,
                medicines: meds,
                message: addMsg,
                patientName: patName,
                imageSrc: base64String,
                imageType: extension,
            })
        }
        else if (base64String === "" || base64String == undefined
            && extension !== "" || extension == undefined &&
            patName !== "" && patAge !== "" && ill.length !== 0) {
            setLoading(true)
            await addDoc(userCollectionRef, {
                birthDate: patAge,
                illness: ills,
                medicines: meds,
                message: addMsg,
                patientName: patName,
                imageSrc: "",
                imageType: "",
            })
        }

        setTimeout(() => {
            document.location.reload()
        }, 1000);

    }

    //TODO    const removePicture = () => {}

    //? Add med as li
    const addMedHandler = e => {
        const ulDom = ulMed.current
        //* Creating ul and adding classes
        const li = document.createElement("li")
        if (med !== "") {
            meds.push(med)
            li.className = `li-med`
            ulDom.appendChild(li)
            li.textContent = `${med}`
            li.setAttribute("id", med)
            setMed('')
            medLabel.current.classList.remove("label-info-active")
        }
        li.addEventListener("click", function (e) {
            console.log(meds);
            let id = e.target.id
            let index = meds.indexOf(id)
            if (index > -1) {
                meds.splice(index, 1)
            }
            e.target.remove()

        })
    }


    return (
        <>
            {loading ? <BarLoader text={"Loading..."} center={true} /> :
                <section className="container-infos">
                    <form className="form-patient-info" method="post" onSubmit={onSubmit}>
                        <div className="d-flex flex-form my-1">
                            <input
                                type="text"
                                placeholder="John Doe"
                                id="patient-name"
                                name="patientName"
                                className="input input-info"
                                value={patName}
                                onChange={(e) => onChangeGeneral(e, setPatName, labelNameRef)}
                            />
                            <label
                                htmlFor="patient-name"
                                className="form-label label-info"
                                ref={labelNameRef}
                            >Patient Name</label>
                        </div>
                        <div className="d-flex flex-form my-1">
                            <input
                                type="date"
                                name="Patient-Age"
                                id="patient-age"
                                max={date}
                                className="input input-info input-date"
                                value={patAge}
                                onChange={dateHandler}
                            />
                            <label htmlFor="patient-age" className="form-label label-info">
                                Date of birth
                            </label>
                        </div>
                        <div className="d-flex flex-form my-1">
                            <input
                                type="text"
                                name="illness"
                                id="illness"
                                className="input input-info"
                                placeholder="Headache"
                                value={ill}
                                onChange={e => {
                                    onChangeGeneral(e, setIll, labelIllRef)
                                    ills.push(ill)
                                }}
                            />
                            <label htmlFor="illness" className="form-label label-info"
                                ref={labelIllRef}
                            >Illness</label>
                        </div>
                        <div className="d-flex flex-form my-1 p-relative">
                            <input
                                type="text"
                                name="medicine"
                                id="medicine"
                                className="input input-info"
                                placeholder="Medicine"
                                value={med}
                                onChange={e => onChangeGeneral(e, setMed, medLabel)}
                            />
                            <label htmlFor="medicine" ref={medLabel} className="form-label label-info"
                            >Medicine</label>
                            <button className="btn-add p-absolute" type="button" onClick={addMedHandler}>+</button>
                        </div>
                        <ul className="ul-med" ref={ulMed}></ul>
                        <div className="d-flex flex-form my-1">
                            <textarea
                                className="input input-info"
                                name="additional-message"
                                id="additional"
                                value={addMsg}
                                onChange={e => onChangeGeneral(e, setAddMsg, labelMsgref)}
                                spellCheck
                                placeholder="Add necessary messages"
                            ></textarea>
                            <label
                                htmlFor="additional"
                                className="form-label label-info"
                                ref={labelMsgref}
                            >Additional message</label>
                        </div>
                        <div className="d-flex flex-form my-1">
                            <input
                                className="file-inp"
                                type="file"
                                name="file"
                                id="patPic"
                                value={file}
                                onChange={handleChange}
                                ref={inpFile}
                            />
                            <label htmlFor="patPic" className="file-label">Add patient picture</label>
                        </div>
                        <div className="text-center">
                            <img className="pat-img" ref={imgRef} />
                        </div>
                        <div className="btn-container">
                            <button className="btn btn-info"
                                type="submit"
                            >Save</button>
                        </div>
                    </form>
                </section >
            }
        </>

    )
}
export default Addpatient