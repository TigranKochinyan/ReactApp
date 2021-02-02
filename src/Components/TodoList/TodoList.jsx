import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './todoList.scss';

import SectioTitle from './../SectionTitle';
import NewTaskOrEdit from './NewTaskOrEdit';
import Task from './Task';
import Confirm from './Confirm';
import TaskSort from './TaskSort';

class TodoList extends Component {
    state = {
        taskList: [],
        checkedTasks: new Set(),
        showWarning: false,
        showNewTaskModal: false,
        taskShouldUpdateing: null
    };
    componentDidMount() {
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const data = await response.json();
                if(response.status >=400 && response.status < 600){
                    if(data.error){
                        throw data.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                this.setState({
                    taskList: data
                });
            })
            .catch((error)=>{
                console.log('catch error', error);
            });

    };
    checkTask = (id) => {
        let checkedTasks = new Set(this.state.checkedTasks);
        if (checkedTasks.has(id)) {
            checkedTasks.delete(id);
        }
        else {
            checkedTasks.add(id);
        };
        this.setState({
            checkedTasks
        });
    };
    removeTask = (id) => {//how it works corectly?
        fetch(`http://localhost:3001/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(async (response) => {
                const res = await response.json();

                if(response.status >=400 && response.status < 600){
                    if(res.error){
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                let taskList = this.state.taskList.filter(task => { return task._id !== id });
                this.setState({
                    taskList
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    deleteSelected = () => {
        let { checkedTasks } = this.state;
        let arraySelected = [...checkedTasks];
        fetch(`http://localhost:3001/task`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tasks: arraySelected
                    }),
                })
                .then(async (response) => {
                    const res = await response.json();
                    if(response.status >=400 && response.status < 600){
                        if(res.error){
                            throw res.error;
                        }
                        else {
                            throw new Error('Something went wrong!');
                        }
                    }
                    let taskList = this.state.taskList.filter(task => !checkedTasks.has(task._id));
                    this.setState({
                        taskList,
                        checkedTasks: new Set(),
                        showWarning: false
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }
    saveOrUpdateTask = (newTask) => {
        let index = this.state.taskList.findIndex( task => task._id === newTask._id );
        const taskList = [...this.state.taskList];
        if( index !== -1 ) {//update
            fetch(`http://localhost:3001/task/${newTask._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                })
                .then(async (response) => {
                    const res = await response.json();
                    if(response.status >=400 && response.status < 600){
                        if(res.error){
                            throw res.error;
                        }
                        else {
                            throw new Error('Something went wrong!');
                        }
                    }
                    taskList[index] = res;
                    this.setState({
                        showNewTaskModal: false,
                        taskList
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            return;
        };
        fetch('http://localhost:3001/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
            })
            .then(async (response) => {
                const res = await response.json();

                if(response.status >=400 && response.status < 600){
                    if(res.error){
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                taskList.push(res);

                this.setState({
                    taskList,
                    showNewTaskModal: false
                });
            })
            .catch((error)=>{
                console.log('catch error', error);
            });
    };
    editTask = (id) => {
        const taskShouldUpdateing = this.state.taskList.find(task => task._id === id);
        this.setState({
            taskShouldUpdateing,
            showNewTaskModal: true
        });
    };
    showAndCloseWarning = () => {
        this.setState({
            showWarning: !this.state.showWarning
        });
    };
    showAndCloseNewTaskModal = () => {
        this.setState({
            showNewTaskModal: !this.state.showNewTaskModal,
            inputValueTitle: '',
            inputValueDesc: '',
            taskShouldUpdateing: null
        });
    };
    checkAllTasks = () => {
        const taskIds = this.state.taskList.map( task => {
            return task._id;
        });
        this.setState({
            checkedTasks: new Set(taskIds)
        });
    };
    unCheckAllTasks = () => {
        this.setState({
            checkedTasks: new Set()
        });
    };
    ///////////////////////////////////////////
    sortTasks = ( type = 'up', sortBy ) => {
        if (!sortBy) {
            return
        }
        const taskList = [...this.state.taskList];        
        taskList.sort((a, b) => {
            if(a[sortBy] > b[sortBy]){
                return type === 'up' ?  1 : -1;
            }
            if(a[sortBy] < b[sortBy]){
                return type === 'up' ?  -1 : 1;
            }
            return 0;
        });
        this.setState({
            taskList
        })
    }

    render() {
        const { taskList, checkedTasks, showNewTaskModal, taskShouldUpdateing, showWarning } = this.state;
        const tasks = taskList.map(item => {
            return (
                <Col xl={3} md={4} sm={6} xs={12} 
                    className={`TodoList-col ${this.state.sorted ? 'sorted' : ''}`} 
                    key={`item${item._id}`}
                >
                    <Task 
                        checkTask={this.checkTask}
                        task={item}
                        removeTask={this.removeTask}
                        disabled={!!checkedTasks.size}
                        checked={ checkedTasks.has(item._id) }
                        editTask={this.editTask}
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
                <TaskSort sortTasks={this.sortTasks} />
                <Row>
                    {tasks}
                </Row>
                {
                    showWarning && <Confirm 
                        show={this.state.showWarning}
                        closeWarning={this.showAndCloseWarning}
                        confirm={this.deleteSelected}
                        taskCount={checkedTasks.size}
                    />
                }
                {
                    showNewTaskModal && <NewTaskOrEdit
                        saveTask={this.saveOrUpdateTask}
                        show={showNewTaskModal}
                        closeModal={this.showAndCloseNewTaskModal}
                        task={taskShouldUpdateing}
                    />
                }
                
            </Container>
        );
    };
};

export default TodoList;