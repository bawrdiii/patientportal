import { useRef } from "react"


const Hamburger = () => {

    const pElement = useRef()

    const hamHandler = () => {

        const pDom = pElement.current

        if (pDom.classList.contains("ham-after")) {
            pDom.classList.remove("ham-after")
        } else {
            pDom.classList.add("ham-after")
        }
    }

    return (
        <div className="hamburger-container" onClick={hamHandler}>
            <p className="hamburger" ref={pElement}></p>
        </div>
    )
}
export default Hamburger