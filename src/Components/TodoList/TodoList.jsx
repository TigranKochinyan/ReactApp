import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import './todoList.scss';
import randomId from './../../helpers/randomIdGenerator';

import SectioTitle from './../SectionTitle';

class TodoList extends Component {
    state = {
        taskList: [
            {
                id: randomId(),
                title: 'task 1',
                description: 'lorem ipsum'
            },
            {
                id: randomId(),
                title: 'task 2',
                description: 'lorem ipsum dolor smit'
            },
            {
                id: randomId(),
                title: 'task 3',
                description: 'lorem ipsum dolor smit 2'
            },
            {
                id: randomId(),
                title: 'task 4',
                description: 'lorem ipsum dolor smit 222'
            }
        ],
        checkedTasks: new Set(),
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
    checkTask = (id) => {
        let checkedTasks = new Set(this.state.checkedTasks);
        if (checkedTasks.has(id)) {
            checkedTasks.delete(id);
        }
        else {
            checkedTasks.add(id);
        }
        this.setState({
            checkedTasks
        })
    }
    removeTask = (id) => {
        let taskList = [...this.state.taskList];
        taskList = taskList.filter(item => item.id !== id);
        this.setState({
            taskList
        });
    };
    deleteSelected = () => {
        let { checkedTasks } = this.state;
        let taskList = this.state.taskList.filter(task => !checkedTasks.has(task.id));
        this.setState({
            taskList,
            checkedTasks: new Set()
        })
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
        const newTask = {
            id: randomId(),
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
        const { taskList, inputValueTitle, validated, inputValueDesc, checkedTasks } = this.state;
        const tasks = taskList.map(item => {
            return (
                <Col xl={3} md={4} sm={6} xs={12} className="TodoList-col" key={`item${item.id}`}>
                    <Card className="TodoList-card">
                        <Card.Body>
                            <Form.Check
                                type="checkbox"
                                id="autoSizingCheck"
                                className="TodoList-card-check"
                                onClick={(event)=> { this.checkTask(item.id) }}
                            />
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            <Button 
                                onClick={() => this.removeTask(item.id)} 
                                variant="outline-danger" 
                                disabled={!!checkedTasks.size}
                                >Delete
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return (
            <Container className="TodoList">
                <SectioTitle title='Add new Task'/>
                <Row>
                    <Col xl={3} md={4} sm={6} xs={12}>
                        <Card>
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
                                <Button disabled={!!checkedTasks.size} type="submit">Save Task</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <SectioTitle title='Your Tasks' />
                <Button onClick={this.deleteSelected} variant="danger" disabled={!checkedTasks.size} className="mb-3 mt-3" >Delete selected tasks</Button>
                <Row>
                    {tasks}
                </Row>
            </Container>
        );
    };
};

export default TodoList;