import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import NewTaskOrEdit from './../Components/TodoList/NewTaskOrEdit';

import { connect } from 'react-redux';
import { getTasks, getTask, saveTask, deleteTask } from './../store/actions';

import { fromatingDate } from './../helpers/utils';

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
        this.props.deleteTask(id);
        this.props.history.push('/');
    };
    closeModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render() {
        const { showModal } = this.state;
        const { task } = this.props;

        return (
            <Container className="TodoList">
                <Row>
                    <Col xs={12}>
                        {
                            task && <Card className={`TodoList-card text-center`}>
                                <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text>
                                        Description: {task.description}
                                    </Card.Text>
                                    <Card.Text>
                                        date: {fromatingDate(task.date)}
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
        sucsessSaveOrUpdateTask: store.sucsessSaveOrUpdateTask
    }
}

const mapDispatchToProps = {
    getTasks,
    getTask,
    saveTask,
    deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);