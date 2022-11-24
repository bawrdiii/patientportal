import Danger from '../../assets/Images/Danger.png'
import Image from 'next/image'

const Authentication = ({ userOnchange,
    userValue,
    userLabelRef,
    passOnchange,
    passValue,
    passLabelRef,
    SubmitForm,
    btnOnclick,
    capslockDetect,
    checkingCapsLock,
    headingRef,
    userInputRef,
    passInputRef
}) => {


    return (
        <>
            <h2 className="welcome-message" ref={headingRef}>Welcome to patient portal</h2>
            <section className="container">
                <form className="main-form" method="post" onSubmit={SubmitForm}>
                    <div className="d-flex flex-form">
                        <input
                            className="input input-text"
                            type="text"
                            name="Username"
                            id="username"
                            placeholder="Administrator"
                            value={userValue}
                            onChange={userOnchange}
                            ref={userInputRef}
                        />
                        <label
                            htmlFor="username"
                            className="form-label"
                            ref={userLabelRef}
                        >Username</label>
                        <small className="error-small mb-1"></small>
                    </div>
                    <div className="d-flex flex-form p-relative">
                        <input
                            type="password"
                            name="Password"
                            id="password"
                            className="input input-pass"
                            placeholder="Admin pass"
                            value={passValue}
                            onChange={passOnchange}
                            onKeyUp={checkingCapsLock}
                            ref={passInputRef}
                        />
                        <label
                            htmlFor="password"
                            className="form-label"
                            ref={passLabelRef}
                        >Password</label>
                        <small className="error-small"></small>
                        <p className='hidden tooltip' ref={capslockDetect}>
                            <span data-text='Caps lock is On!'>
                                <Image src={Danger} width='20px' height='20px' alt='Caps lock detected' />
                            </span>
                        </p>
                    </div>
                    <div className="btn-container">
                        <button type="submit" className="btn btn-signIn" onClick={btnOnclick}> Sign in</button>
                    </div>
                </form>
            </section>
        </>

    )
}
export default Authentication