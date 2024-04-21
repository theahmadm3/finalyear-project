import { useState } from 'react';
import { Modal } from 'react-bootstrap';
function ErrorLoading() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton={true}>
            </Modal.Header>
            <Modal.Body>
                <h5 className='tc'>Network Error</h5>
                <h5 className='tc'>Check your internet connection and refresh the page</h5>
            </Modal.Body>
        </Modal>
    )
}

export default ErrorLoading
