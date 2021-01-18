import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const Confirm = (props) => {

    const { show, closeWarning, taskCount, confirm } = props;
    return (
        <Modal
            show={show}
            onHide={closeWarning}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>are you sure, you want to delete {taskCount} { taskCount > 1 ? 'tasks' : 'task' } ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeWarning} >
                    Close
            </Button>
                <Button variant="warning" onClick={confirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

Confirm.propTypes = {
    show: PropTypes.bool.isRequired,
    taskCount: PropTypes.number.isRequired,
    confirm: PropTypes.func.isRequired,
    closeWarning: PropTypes.func.isRequired
}

export default Confirm;

