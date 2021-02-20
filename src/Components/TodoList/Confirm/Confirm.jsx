import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { deleteSelected } from './../../../store/actions';

const Confirm = (props) => {

    const { show, closeWarning, checkedTasks } = props;
    const taskCount = checkedTasks.size;

    const deleteSelected = () => {
        let arraySelected = [...checkedTasks];
        props.deleteSelected({tasks: arraySelected}, checkedTasks);
    };

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
                <Button variant="warning" onClick={deleteSelected}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

Confirm.propTypes = {
    show: PropTypes.bool.isRequired,
    closeWarning: PropTypes.func.isRequired,
    checkedTasks: PropTypes.object.isRequired //Set
};

const mapDispatchToProps = {
    deleteSelected
};

export default connect(null, mapDispatchToProps)(Confirm);

