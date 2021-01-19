import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './todoList.scss';
import randomId from './../../helpers/randomIdGenerator';

import SectioTitle from './../SectionTitle';
import NewTask from './NewTask';
import Task from './Task';
import Confirm from './Confirm';


class TodoList extends Component {
    state = {
        taskList: [],
        checkedTasks: new Set(),
        inputValueTitle: '',
        inputValueDesc: '',
        validated: false,
        show: false
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
            checkedTasks: new Set(),
            show: false
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
    showAndCloseWarning = () => {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        const { taskList, inputValueTitle, validated, inputValueDesc, checkedTasks } = this.state;
        const tasks = taskList.map(item => {
            return (
                <Col xl={3} md={4} sm={6} xs={12} className="TodoList-col" key={`item${item.id}`}>
                    <Task 
                        checkTask={this.checkTask}
                        item={item}
                        removeTask={this.removeTask}
                        disabled={!!checkedTasks.size}
                        extraClass={ checkedTasks.has(item.id) ? 'checked' : '' }
                    />
                </Col>
            );
        });
        return (
            <Container className="TodoList">
                <SectioTitle title='Add new Task'/>
                <Row>
                    <Col xl={3} md={4} sm={6} xs={12}>
                        <NewTask 
                            handleSubmit={this.handleSubmit}
                            inputTitle={inputValueTitle}
                            inputDesc={inputValueDesc}
                            handleInputChange={this.handleInputChange}
                            validated={validated}
                            disabled={!!checkedTasks.size}
                        />
                    </Col>
                </Row>
                <SectioTitle title='Your Tasks' />
                <Button onClick={this.showAndCloseWarning} variant="danger" disabled={!checkedTasks.size} className="mb-3 mt-3" >Delete selected tasks</Button>
                <Row>
                    {tasks}
                </Row>
                <Confirm 
                    show={this.state.show}
                    closeWarning={this.showAndCloseWarning}
                    confirm={this.deleteSelected}
                    taskCount={checkedTasks.size}
                />
            </Container>
        );
    };
};

export default TodoList;