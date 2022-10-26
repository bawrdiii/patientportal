import Link from "next/link";


const PatientContainer = () => {

    return (
        <Link href="/addpatient">
            <section className="patient-container">
                <p className="add-label">Add patient info</p>
                <a className="add-button">
                    +
                </a>
            </section>
        </Link>
    )

}

export default PatientContainer;