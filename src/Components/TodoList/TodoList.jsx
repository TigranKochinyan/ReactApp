import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import './todoList.scss';

import SectioTitle from './../SectionTitle';
import NewTaskOrEdit from './NewTaskOrEdit';
import Task from './Task';
import Confirm from './Confirm';
import TaskSort from './TaskSort';

import { 
    getTasks
} from './../../store/actions';

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
                <TaskSort />
                <Row>
                    {tasks}
                </Row>
                {
                    showWarning && <Confirm 
                        show={this.state.showWarning}
                        closeWarning={this.showAndCloseWarning}
                        checkedTasks={ checkedTasks }//stugum
                    />
                }
                {
                    showNewTaskModal && <NewTaskOrEdit
                        show={showNewTaskModal}
                        closeModal={this.showAndCloseNewTaskModal}
                        task={taskShouldUpdateing}
                    />
                }
            </Container>
        );
    };
};

const mapStateToProps = (store) => {
    return {
        taskList: store.taskList,
        sucsessSaveOrUpdateTask: store.sucsessSaveOrUpdateTask,
        sucsessDeleteSelected: store.sucsessDeleteSelected
    }
}

const mapDispatchToProps = {
    getTasks
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);