import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';

import { saveTask, updateTask } from './../../../store/actions';

import { fromatingDate } from './../../../helpers/utils';

class NewTaskOrEdit extends React.Component {
    constructor(props) {
        super(props);
        this.titleInputRef = React.createRef();
        this.state = {
            inputValueTitle: props.task ? props.task.title : '',
            inputValueDesc: props.task ? props.task.description : '',
            inputValueDate: props.task ? new Date(props.task.date) : new Date(),
            validated: false
        };
    };
    componentDidMount() {
        this.titleInputRef.current.focus();//when modal open title input was focused
    }
    handleInputChange = (event) => {
        let { value } = event.target;
        let wichInput = event.target.name;  
        this.setState({
            [wichInput]: value
        });
    };
    handleDateChange = (date) => {
        this.setState({
            inputValueDate: date || new Date()
        })
    };

    saveOrUpdateTask = (newTask) => {
        if( newTask._id ) {//update Task
            this.props.updateTask(newTask);
            return;
        };
        this.props.saveTask(newTask);//new Task
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
        const { inputValueDate, inputValueTitle, inputValueDesc } = this.state;
        const newTask = {
            title: inputValueTitle,
            description: inputValueDesc,
            date: fromatingDate( inputValueDate.toISOString() ),
            _id: this.props.task?._id
        };
        // console.log(newTask);
        this.saveOrUpdateTask(newTask);
    };
    render() {
        const { validated, inputValueDesc, inputValueTitle } = this.state;
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
                                    ref={this.titleInputRef}
                                    name='inputValueTitle'
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
                                        name='inputValueDesc'
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
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                            <DatePicker
                                selected={ this.state.inputValueDate }
                                onChange={ this.handleDateChange }
                                name="inputValueDate"
                                // showTimeSelect
                                // dateFormat="Pp"
                                minDate={ new Date() }
                                />
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
NewTaskOrEdit.propTypes = {
    saveTask: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    task: PropTypes.object
}

const mapStateToProps = (store) => {
    return {
        taskList: store.taskList
    }
}

const mapDispatchToProps = {
    saveTask,
    updateTask
};


export default connect(mapStateToProps, mapDispatchToProps)(NewTaskOrEdit);




