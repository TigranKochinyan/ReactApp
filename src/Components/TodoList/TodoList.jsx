import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import './todoList.scss';
import { v4 as uuidv4 } from 'uuid';

import SectioTitle from './../SectionTitle';

class TodoList extends Component {
    state = {
        taskList: [
            {
                id: uuidv4(),
                title: 'task 1',
                description: 'lorem ipsum'
            },
            {
                id: uuidv4(),
                title: 'task 2',
                description: 'lorem ipsum dolor smit'
            },
            {
                id: uuidv4(),
                title: 'task 3',
                description: 'lorem ipsum dolor smit 2'
            },
            {
                id: uuidv4(),
                title: 'task 4',
                description: 'lorem ipsum dolor smit 222'
            }
        ],
        inputValueTitle: '',
        inputValueDesc: '',
        validated: false,
    };
    handleInputChange = (event) => {
        let { value } = event.target;
        let wichInput = event.target.id === 'inputTitle' ? 'inputValueTitle' : 'inputValueDesc';      
        this.setState({
            [wichInput]: value
        });
    };
    removeTask = (event) => {
        const taskList = this.state.taskList.filter(item => item.id !== event.target.id);
        console.log(event.target.id, taskList);
        this.setState({
            taskList
        })
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
            id: uuidv4(),
            title: this.state.inputValueTitle,
            description: this.state.inputValueDesc
        };
        const taskList = [...this.state.taskList, newTask]
        this.setState({
            validated: false,
            taskList,
            inputValueTitle: '',
            inputValueDesc: ''
        })
    };
    render() {
        const { taskList, inputValueTitle, validated, inputValueDesc } = this.state;
        const tasks = taskList.map(item => {
            return (
                <Col key={`item${item.id}`}>
                    <Card className="TodoList-card">
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            <Button id={item.id} onClick={this.removeTask} variant="outline-danger">Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return (
            <Container className="TodoList">
                <SectioTitle title='Add new Task' />
                <Row>
                    <Col>
                        <Card style={{ width: '20rem' }}>
                        <Card.Body>
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
                                                    required
                                                    value={inputValueDesc}
                                                    onChange={this.handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Description should not be empty
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                <Button type="submit">Save Task</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <SectioTitle title='Your Tasks' />
                <Row>
                    {tasks}
                </Row>
            </Container>
        );
    };
};

export default TodoList;