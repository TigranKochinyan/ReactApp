import React from 'react';

import { Card, Button, Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import NewTaskOrEdit from './../Components/TodoList/NewTaskOrEdit';

import { fromatingDate } from './../helpers/utils';

class SingleTask extends React.Component {
    state = {
        task: null,
        showModal: false
    };
    componentDidMount() {
        const { taskId } = this.props.match.params;
        fetch(`http://localhost:3001/task/${taskId}`, {
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
                    task: data
                });
            })
            .catch((error)=>{
                console.log('catch error', error);
            });
    };
    updateTask = (newTask) => {
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
                this.setState({
                    showModal: false,
                    task: res
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return;
    };
    removeTask = (id) => {
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
                this.props.history.push('/')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    closeModal = () => {
        console.log(this.state);
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render() {
        const { task, showModal } = this.state;

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

export default SingleTask;