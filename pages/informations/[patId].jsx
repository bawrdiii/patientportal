import { useRouter } from "next/router"
import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../components/firebaseconfig/firebaseconfig";
import ShowPatient from "../../components/show patient/showPatient";


const PatId = () => {


    return <ShowPatient />
}
export default PatId
