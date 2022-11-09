import { useRef } from "react"


const Hamburger = ({ pElement, hamHandler }) => {



    return (
        <div className="hamburger-container" onClick={hamHandler}>
            <p className="hamburger" ref={pElement}></p>
        </div>
    )
}
export default Hamburger