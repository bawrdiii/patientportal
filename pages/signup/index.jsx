// import SignUp from "../../components/user handler/signup"
// import {
//     createUserWithEmailAndPassword, //TODO logout
// } from "firebase/auth"
// import { useState, useRef } from "react"
// import { auth } from "../../components/firebaseconfig/firebaseconfig"


// const signMain = () => {

//     const [signIn, setSignIn] = useState(true)
//     const [uid, setUid] = useState("")
//     const [usrEmail, setUsrEmail] = useState("")

//     const [signUpEmail, setSignUpEmail] = useState("")
//     const [signUpPass, setSignUpPass] = useState("")

//     const signUpEmailLabel = useRef()
//     const signUpPassLabel = useRef()



//     const register = async (e) => {
//         e.preventDefault()
//         try {
//             const user = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPass)
//             console.log((user.user.getIdTokenResult()).token);
//             setUid(user.user.uid)
//         }
//         catch (err) {
//             console.log(err.message);
//         }
//     }




//     const onchangeGeneral = (e, label, set) => {
//         let value = e.target.value
//         if (value !== "") {
//             set(value)
//             label.current.classList.add("label-info-active")
//         }
//         else {
//             set("")
//             label.current.classList.remove("label-info-active")

//         }
//     }

//     const LogOutHandler = async () => {

//     }

//     return (
//         <>
//             <Navbar logOutHandler={LogOutHandler} />
//             <section className="container-infos p-relative section-signin">
//                 <SignUp signIn={signIn}
//                     loginHandler={() => setSignIn(false)}
//                     register={register}
//                     signUpEmail={signUpEmail}
//                     signUpPass={signUpPass}
//                     signUpEmailOnchange={e => onchangeGeneral(e, signUpEmailLabel, setSignUpEmail)}
//                     signUpPassOnchange={e => onchangeGeneral(e, signUpPassLabel, setSignUpPass)}
//                     emailSignUpLabel={signUpEmailLabel}
//                     signUpPasslabel={signUpPassLabel}

//                 />
//             </section>
//         </>
//     )
// }
// export default signMain