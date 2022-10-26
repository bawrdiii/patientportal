import { useRouter } from "next/router"
import { useEffect } from "react"



const Addpatient = ({ nameValue, nameOnchange, nameInpRef, labelNameRef, onSubmit }) => {

    const route = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("Token")
        if (!token) {
            route.push("/")
        }
        else return
    }, [])
    return (
        <section className="container-infos">
            <form className="form-patient-info" method="post" onSubmit={onSubmit}>
                <div className="d-flex flex-form form-info">
                    <input
                        type="text"
                        placeholder="John Doe"
                        id="patient-name"
                        name="patientName"
                        className="input input-info"
                        value={nameValue}
                        onChange={nameOnchange}
                        ref={nameInpRef}
                    />
                    <label
                        htmlFor="patient-name"
                        className="form-label label-info"
                        ref={labelNameRef}
                    >Patient Name</label>
                </div>
            </form>
        </section>
    )
}
export default Addpatient