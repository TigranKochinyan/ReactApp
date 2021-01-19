import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import randomId from './../../../helpers/randomIdGenerator';

class NewTask extends React.Component {
    state = {
        inputValueTitle: '',
        inputValueDesc: '',
        validated: false
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({
                validated: true
            })
            return;
        }
        const newTask = {
            id: randomId(),
            title: this.state.inputValueTitle,
            description: this.state.inputValueDesc
        };
        this.props.saveTask(newTask)

    };
    handleInputChange = (event) => {
        let { value } = event.target;
        let wichInput = event.target.id === 'inputTitle' ? 'inputValueTitle' : 'inputValueDesc';      
        this.setState({
            [wichInput]: value
        });
    };
    render() {

        const { validated, inputDesc, inputTitle} = this.state;
        const { show, closeWarning } = this.props;
        return (
            <Modal
                show={show}
                onHide={closeWarning}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Write Your Task </Modal.Title>
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
                                    value={inputTitle}
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
                                        required
                                        value={inputDesc}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Description should not be empty
                                                </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" variant="success">Save Task</Button>
                        <Button variant="secondary" className="ml-1" onClick={closeWarning} >
                            Close
                        </Button>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
        )
    }
}
NewTask.propTypes = {
    saveTask: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    closeWarning: PropTypes.func.isRequired
}

export default NewTask;



