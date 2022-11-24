
// const SignUp = ({
//     signIn, loginHandler, register,
//     signUpEmail, signUpEmailOnchange, emailSignUpLabel
//     , signUpPass, signUpPassOnchange, signUpPasslabel
// }) => {



//     return (
//         <>
//             <form method="post" onSubmit={register} className={signIn ? `p-absolute form-signin transition` : `p-absolute form-signin hidden transition`}>
//                 <h3 className="create-msg">Create an account</h3>
//                 <div className="d-flex flex-form my-1">
//                     <input value={signUpEmail} onChange={signUpEmailOnchange}
//                         type="text" name="email" className="input input-info" placeholder="somebody@gmail.com" id="userEmail" />
//                     <label htmlFor="userEmail" className="form-label label-info" ref={emailSignUpLabel}>Email</label>
//                 </div>
//                 <div className="d-flex flex-form my-1">
//                     <input type="password"
//                         value={signUpPass} onChange={signUpPassOnchange}
//                         name="pass" placeholder="Your password"
//                         className="input input-info"
//                         id="userPass" />
//                     <label htmlFor="userPass"
//                         className="form-label label-info" ref={signUpPasslabel}>Password</label>
//                 </div>
//                 <div className="button-container">
//                     <button type="submit" className="btn btn-edit">register</button>
//                 </div>
//                 <small onClick={loginHandler}> already have an account? <span>Log in!</span></small>
//             </form>
//         </>
//     )
// }

// export default SignUp