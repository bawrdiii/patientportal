import { async } from "@firebase/util"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebaseconfig/firebaseconfig"



const Addpatient = () => {

    //? States
    const [patName, setPatName] = useState('')
    const [patAge, setPatAge] = useState('')
    const [ill, setIll] = useState('')
    const [addMsg, setAddMsg] = useState('')
    const [file, setFile] = useState('')
    const [med, setMed] = useState('')
    const [meds, setMeds] = useState([])
    //? Refrences
    const labelNameRef = useRef()
    const labelAgeRef = useRef()
    const labelIllRef = useRef()
    const labelMsgref = useRef()
    const inpFile = useRef()
    const imgRef = useRef()
    const medLabel = useRef()
    const ulMed = useRef()
    const nameInpRef = useRef()
    const ageInpRef = useRef()

    var extension, base64String = '';


    const userCollectionRef = collection(db, "Informations")

    const route = useRouter()
    //* Checking if token is available or not
    useEffect(() => {
        const token = localStorage.getItem("Token")
        if (!token) {
            route.push("/")
        }
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
                console.log(base64String);


                img.setAttribute("src", e.target.result);
                img.setAttribute("alt", "Patient pictue");

            };
            extension = file[0].type;

            fileReader.readAsDataURL(file[0])
        }
        console.log(extension);

    }

    const onSubmit = async (e) => {
        e.preventDefault()

        /*
        *      var reqOpt = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      name: patName,
                      BirthDate: patAge,
                      Illness: ill,
                      Medicines: meds.map(item => item),
                      Message: addMsg,
                      PatientName: patName,
                      imageSrc: base64String,
                      imageType: extension
                  }),
                  redirect: "follow"
              }
              fetch("https://patient-portal-950da-default-rtdb.europe-west1.firebasedatabase.app/Informations.json", reqOpt)
                  .then(response => response.json())
                 * .then(result => console.log(result))
                  */

        await addDoc(userCollectionRef, {
            birthDate: patAge,
            illness: ill,
            medicines: meds.map(item => item),
            message: addMsg,
            patientName: patName,
            imageSrc: base64String,
            imageType: extension
        })
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
            setMed('')
            medLabel.current.classList.remove("label-info-active")
        }
        li.addEventListener("click", function (e) {
            e.target.remove()
        })
    }


    return (
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
                        ref={nameInpRef}
                    />
                    <label
                        htmlFor="patient-name"
                        className="form-label label-info"
                        ref={labelNameRef}
                    >Patient Name</label>
                </div>
                <div className="d-flex flex-form my-1">
                    <input
                        type="text"
                        name="Patient-Age"
                        id="patient-age"
                        className="input input-info"
                        placeholder="DD/MM/YY"
                        value={patAge}
                        onChange={e => onChangeGeneral(e, setPatAge, labelAgeRef)}
                        ref={ageInpRef}
                    />
                    <label htmlFor="patient-age" className="form-label label-info"
                        ref={labelAgeRef}>
                        Year of birth
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
                        onChange={e => onChangeGeneral(e, setIll, labelIllRef)}
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
    )
}
export default Addpatient