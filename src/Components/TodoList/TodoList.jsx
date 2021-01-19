import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './todoList.scss';

import SectioTitle from './../SectionTitle';
import NewTask from './NewTask';
import Task from './Task';
import Confirm from './Confirm';


class TodoList extends Component {
    state = {
        taskList: [],
        checkedTasks: new Set(),
        showWarning: false,
        showNewTaskModal: false
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
            showWarning: false
        })
    }
    saveTask = (newTask) => {
        const taskList = [...this.state.taskList, newTask]
        this.setState({
            taskList,
            showNewTaskModal: false
        })
    };
    showAndCloseWarning = () => {
        this.setState({
            showWarning: !this.state.showWarning
        })
    }
    showAndCloseNewTaskModal = () => {
        this.setState({
            showNewTaskModal: !this.state.showNewTaskModal,
            inputValueTitle: '',
            inputValueDesc: '',
        })
    }
    checkAllTasks = () => {
        const taskIds = this.state.taskList.map( task => {
            return task.id;
        })
        this.setState({
            checkedTasks: new Set(taskIds)
        })
    };
    unCheckAllTasks = () => {
        this.setState({
            checkedTasks: new Set()
        })
    }

    render() {
        const { taskList, checkedTasks, showNewTaskModal } = this.state;
        const tasks = taskList.map(item => {
            return (
                <Col xl={3} md={4} sm={6} xs={12} className="TodoList-col" key={`item${item.id}`}>
                    <Task 
                        checkTask={this.checkTask}
                        item={item}
                        removeTask={this.removeTask}
                        disabled={!!checkedTasks.size}
                        checked={ checkedTasks.has(item.id) }
                    />
                </Col>
            );
        });
        return (
            <Container className="TodoList">
                <SectioTitle title='Your Tasks' />
                <Row>
                    <Col>
                        <Button disabled={!!checkedTasks.size} onClick={this.showAndCloseNewTaskModal} className="mb-3 mt-3" > New Task </Button>
                    </Col>
                    <Col>
                        <Button onClick={this.showAndCloseWarning} variant="danger" disabled={!checkedTasks.size} className="mb-3 mt-3" >Delete selected tasks</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.checkAllTasks} variant="warning" className="mb-3 mt-3" > Select Tasks </Button>
                    </Col>
                    <Col>
                        <Button onClick={this.unCheckAllTasks} variant="warning" className="mb-3 mt-3" > Deselect Tasks </Button>
                    </Col>
                </Row>
                <Row>
                    {tasks}
                </Row>
                <Confirm 
                    show={this.state.showWarning}
                    closeWarning={this.showAndCloseWarning}
                    confirm={this.deleteSelected}
                    taskCount={checkedTasks.size}
                />
                <NewTask 
                    saveTask={this.saveTask}
                    show={showNewTaskModal}
                    closeWarning={this.showAndCloseNewTaskModal}
                />
            </Container>
        );
    };
};

export default TodoList;