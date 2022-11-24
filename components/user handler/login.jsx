// const LogIn = ({ signIn, signInHandler, loginUser, passLabel, emailLabel, OnchangeLoginUs, onChangeLoginPass, emailLogin, passLogin }) => {



//     return (
//         <>
//             <form method="post" onSubmit={loginUser} className={!signIn ? `p-absolute form-signin transition` : `p-absolute form-signin transition hidden`}>
//                 <h3 className="create-msg">Login to your account</h3>
//                 <div className="d-flex flex-form my-1">
//                     <input type="text" name="email" onChange={OnchangeLoginUs} className="input input-info"
//                         value={emailLogin}
//                         placeholder="somebody@gmail.com" id="loginEmail" />
//                     <label htmlFor="loginEmail" className="form-label label-info" ref={emailLabel}>Email</label>
//                 </div>
//                 <div className="d-flex flex-form my-1">
//                     <input type="password" name="pass" placeholder="Your password"
//                         className="input input-info"
//                         value={passLogin}
//                         onChange={onChangeLoginPass}
//                         id="loginPass" />
//                     <label htmlFor="loginPass"
//                         className="form-label label-info" ref={passLabel}>Password</label>
//                 </div>
//                 <div className="button-container">
//                     <button type="submit" className="btn btn-edit">Login</button>
//                 </div>
//                 <small onClick={signInHandler}>Haven&apos;t been here? <span>Create an account!</span></small>
//             </form></>
//     )
// }

// export default LogIn