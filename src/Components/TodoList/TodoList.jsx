import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './todoList.scss';
import { connect } from 'react-redux';
import request from './../../helpers/request';

import SectioTitle from './../SectionTitle';
import NewTaskOrEdit from './NewTaskOrEdit';
import Task from './Task';
import Confirm from './Confirm';
import TaskSort from './TaskSort';

class TodoList extends Component {
    state = {
        checkedTasks: new Set(),
        showWarning: false,
        showNewTaskModal: false,
        taskShouldUpdateing: null
    };
    componentDidMount() {
        this.props.getTasks();
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
    removeTask = (id) => {
        this.props.deleteTask(id);
    };
    deleteSelected = () => {
        let { checkedTasks } = this.state;
        let arraySelected = [...checkedTasks];
        this.props.deleteSelected({tasks: arraySelected}, checkedTasks);
    }
    saveOrUpdateTask = (newTask) => {
        let index = this.props.taskList.findIndex( task => task._id === newTask._id );
        if( index !== -1 ) {//update
            this.props.updateTask(newTask,index);
            return;
        };
        this.props.saveTask(newTask);
    };
    editTask = (id) => {
        const taskShouldUpdateing = this.props.taskList.find(task => task._id === id);
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
        const taskIds = this.props.taskList.map( task => {
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
    sortTasks = ( type = 'up', sortBy ) => {//not working, comming soon
        if (!sortBy) {
            return
        }
        const taskList = [...this.props.taskList];  
        taskList.sort((a, b) => {
            if(a[sortBy] > b[sortBy]){
                return type === 'up' ?  1 : -1;
            }
            if(a[sortBy] < b[sortBy]){
                return type === 'up' ?  -1 : 1;
            }
            return 0;
        });
        this.props.sortTasks(taskList);
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.sucsessSaveOrUpdateTask && this.props.sucsessSaveOrUpdateTask) {
            this.setState({
                showNewTaskModal: false
            });
            return
        }
        if(!prevProps.sucsessDeleteSelected && this.props.sucsessDeleteSelected) {
            this.setState({
                showWarning: false,
                checkedTasks: new Set()
            });
            return;
        }
    }

    render() {
        const { taskList } = this.props;
        const { checkedTasks, showNewTaskModal, taskShouldUpdateing, showWarning } = this.state;
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

const mapStateToProps = (store) =>{
    return {
        taskList: store.taskList,
        sucsessSaveOrUpdateTask: store.sucsessSaveOrUpdateTask,
        sucsessDeleteSelected: store.sucsessDeleteSelected
    }
}

const mapDispatchToProps = {
    getTasks: ()=>{
        return (dispatch) => {
            request('http://localhost:3001/task')
            .then((tasks)=>{
                dispatch({type: 'GET_TASKS', tasks: tasks});
            });
        }
    },
    saveTask: (task) => {
        return (dispatch) => {
            dispatch({type: 'ADDING_TASK'});

            request('http://localhost:3001/task', 'POST', task)
            .then((task)=>{
                dispatch({type: 'ADD_TASK', task: task});
            });
        }
    },
    updateTask: (updatedTask, index) => {
        return (dispatch) => {
            dispatch({type: 'ADDING_TASK'});

            request(`http://localhost:3001/task/${updatedTask._id}`, 'PUT', updatedTask)
            .then((task)=>{
                dispatch({type: 'UPDATE_TASK', updatedTask, index});
            });
        }
    },
    deleteTask: (id) => {
        return (dispatch) => {
            request(`http://localhost:3001/task/${id}`, 'DELETE')
            .then((res)=>{
                console.log(res,'del');
                dispatch({type: 'DELETE_TASK', id});
            });
        }
    },
    deleteSelected: (requestBody, checkedTasks) => {
        return (dispatch) => {
            dispatch({type: 'DELETING_SELECTED'});

            request(`http://localhost:3001/task`, 'PATCH', requestBody)
            .then((res)=>{
                dispatch({type: 'DELETE_SELECTED', checkedTasks});
            })
        }
    },
    sortTasks: (taskList) => {
        return (dispatch) => {
            dispatch({type: 'SORT_LIST', taskList});
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);