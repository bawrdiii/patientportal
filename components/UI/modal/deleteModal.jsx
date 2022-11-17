import Backdrop from "../backdrop/backdrop"
const DeleteModal = ({ ModalClose, show, deleteHandler, noHandler }) => {


    return (
        <>
            <Backdrop click={ModalClose} show={show} />
            <div className="modal delete-modal"
                style={{
                    transform: show ? "translateY(0)" : "translateY(-100vh)"
                    , opacity: show ? "1" : "0"
                }}
            >
                <h3>Are you sure to want to delete all informations?</h3>
                <div className="button-container">
                    <button type="button" className="btn btn-delete" onClick={deleteHandler}>Yes</button>
                    <button type="button" className="btn btn-cancel" onClick={noHandler}>No</button>
                </div>
            </div>
        </>
    )

}


export default DeleteModal