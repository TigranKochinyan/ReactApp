import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import randomId from './../../../helpers/randomIdGenerator';

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValueTitle: props.task ? props.task.title : '',
            inputValueDesc: props.task ? props.task.description : '',
            validated: false
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({
                validated: true
            })
            return;
        }
        const {task, saveTask} = this.props;//if this.props.task is not null updateing task else creating new task with new random id
        const newTask = {
            id: task ? task.id : randomId(),
            title: this.state.inputValueTitle,
            description: this.state.inputValueDesc
        };
        saveTask(newTask);
    };
    handleInputChange = (event) => {
        let { value } = event.target;
        let wichInput = event.target.id === 'inputTitle' ? 'inputValueTitle' : 'inputValueDesc';      
        this.setState({
            [wichInput]: value
        });
    };
    render() {
        const { validated, inputValueDesc, inputValueTitle} = this.state;
        const { show, closeModal, task } = this.props;
        return (
            <Modal
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> { task ? 'Edit' : 'Write' } Your Task </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" >
                                <Form.Label>Task title</Form.Label>
                                <Form.Control
                                    id='inputTitle'
                                    required
                                    type="text"
                                    placeholder="Title"
                                    value={inputValueTitle}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Task title should not be empty
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label>Description</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        id='inputDesc'
                                        as="textarea"
                                        rows={3}
                                        type="text"
                                        placeholder="Description"
                                        value={inputValueDesc}
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" variant="success">Save Task</Button>
                        <Button variant="secondary" className="ml-1" onClick={closeModal} >
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
NewTask.propTypes = {
    saveTask: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    task: PropTypes.object
}

export default NewTask;



