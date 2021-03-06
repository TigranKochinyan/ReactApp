import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';

import NewTaskOrEdit from './../Components/TodoList/NewTaskOrEdit';

import { connect } from 'react-redux';
import { getTask, saveTask, deleteTask, updateTask } from './../store/actions';

import { formatingDate } from './../helpers/utils';
import './pages.scss';

class SingleTask extends React.Component {
    state = {
        task: null,
        showModal: false
    };
    componentDidMount() {
        const { taskId } = this.props.match.params;
        this.props.getTask(taskId);
    };
    componentDidUpdate(prevProps) {
        if(!prevProps.sucsessSaveOrUpdateTask && this.props.sucsessSaveOrUpdateTask) {
            this.setState({
                showModal: false,
            });
            return;
        }
    }
    updateTask = (newTask) => {
        this.props.updateTask(newTask);
    };
    removeTask = (id) => {
        this.props.deleteTask(id, 'single');
        // this.props.history.push('/');//
    };
    closeModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render() {
        const { showModal } = this.state;
        const { task, theme } = this.props;

        return (
            <Container className={`singleTask singleTask-${theme} mt-3`}>
                <Row>
                    <Col xs={12}>
                        {
                            task && <Card className={`singleTask-card text-center`}>
                                <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text>
                                        Description: {task.description}
                                    </Card.Text>
                                    <Card.Text>
                                        Status: {task.status}
                                    </Card.Text>
                                    <Card.Text>
                                        Date: {formatingDate(task.date)}
                                    </Card.Text>
                                    <Card.Text>
                                        Created at: {formatingDate(task.created_at)}
                                    </Card.Text>
                                    <Button
                                        className="icon-in-button"
                                        onClick={() => this.removeTask(task._id)}
                                        variant="outline-danger"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                    <Button
                                        className="icon-in-button ml-1"
                                        onClick={this.closeModal}
                                        variant="outline-warning"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    {
                                        task.status === 'active' ?
                                            <Button
                                                className="icon-in-button ml-1"
                                                onClick={() => this.props.updateTask({
                                                    _id: task._id,
                                                    status: 'done'
                                                })}
                                                variant="outline-success"
                                            >
                                                <FontAwesomeIcon icon={ faCheck } />
                                            </Button> :
                                            <Button
                                                className="icon-in-button ml-1"
                                                onClick={() => this.props.updateTask({
                                                    _id: task._id,
                                                    status: 'active'
                                                })}
                                                variant="outline-secondary"
                                            >
                                                <FontAwesomeIcon icon={ faRedo } />
                                            </Button>
                                    }
                                </Card.Body>
                            </Card>
                        }
                        {
                            showModal && <NewTaskOrEdit
                            saveTask={this.updateTask}
                            show={showModal}
                            closeModal={this.closeModal}
                            task={task}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        taskList: store.taskList,
        task: store.task,
        sucsessSaveOrUpdateTask: store.sucsessSaveOrUpdateTask,
        theme: store.theme
    }
}

const mapDispatchToProps = {
    updateTask,
    getTask,
    saveTask,
    deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);